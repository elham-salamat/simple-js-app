

// Calculating the number of items per row to responsive pagination
function getNumberOfItemsPerRow(list) {
    var counter = 0;
    var firstRowOffsetTop = list[0].offsetTop;

    list.forEach(function(square) {
        if (square.offsetTop === firstRowOffsetTop) {
            counter += 1;
        }
    });

    return counter;
}

// Distribute the list of pokemon in different pages
function pagination() {
    let pokemonListItems = document.querySelectorAll('#pokemon-list>li');
    let itemsPerRow = getNumberOfItemsPerRow(pokemonListItems);
    let totalNumberOfPokemon = $('#pokemon-list .list-group-item').length;
    let pageLimits = 11 * itemsPerRow;
    let numberOfPages = Math.ceil(totalNumberOfPokemon / pageLimits);


    // Creation of pagination elements
    $('#pokemon-list .list-group-item:gt(' + (pageLimits - 1) + ')').hide();

    $('.pagination').append('<li class="page-item active"><a class="page-link" href="javascript:void(0)">1</a></li>');


    for (let i = 2; i <= numberOfPages; i++) {
        $('.pagination').append('<li class="page-item"><a class="page-link" href="javascript:void(0)">' + i + '</a></li>');

    }

    $('.pagination').append('<li id="next"><a class="page-link" href="javascript:void(0)" aria-label="Next"><span aria-hidden="true">&raquo;</span><span class="sr-only">Next</span></a></li>');

    if (itemsPerRow === 1) {
      $('.page-link').addClass('mobile-size');
    }

    // Representation of different pages
    $('#pagination li.page-item').on('click', function() {

        if($(this).hasClass('active')) {
            return false;
        } else {
          let currentPage = $(this).index();
          $('#pagination li').removeClass('active');
          $(this).addClass('active');
          $('#pokemon-list .list-group-item').hide();
          let grandTotal = pageLimits * currentPage;

          for(let i = grandTotal - pageLimits; i < grandTotal; i++) {
            $('#pokemon-list .list-group-item:eq(' + i + ')').show();
          }
        }



    })
    return [numberOfPages, pageLimits]

}

// pokemonRepository creation and retrievement function
let pokemonRepository = (function () {

    // pokemonRepository creation
    let pokemonList = [];
    let pokemonApiUrl =  'https://pokeapi.co/api/v2/pokemon/?limit=150';

    let modalContainer = document.querySelector('#modal-container');

    // function to add new object (pokemon) to pokemonRepository
    function add(pokemon) {
        pokemonList.push(pokemon);
    }

    // function to retrieve the pokemons' list available in pokemonRepository
    function getAll() {
        return pokemonList
    }

    // function to create and represent the pokemon item in web browser
    function addListItem(pokemon) {
        let ul = document.querySelector('#pokemon-list');
        let listItem = document.createElement('li');
        listItem.classList.add('list-group-item');
        listItem.classList.add('col-xl-2');
        listItem.classList.add('col-lg-3');
        listItem.classList.add('col-md-4');
        listItem.classList.add('col-sm-6');
        listItem.classList.add('col-12');

        let button = document.createElement('button');
        button.innerText = pokemon.name;
        button.classList.add('btn');
        button.classList.add('btn-primary');
        button.setAttribute('data-toggle','modal');
        button.setAttribute('data-target','#modal-container');

        button.addEventListener('click', function () {
            showDetails(pokemon);
        });

        listItem.appendChild(button);
        ul.appendChild(listItem);
    }



    // load pokemons' list from an external API and add them into our repository
    function loadPokemonList() {
        return fetch('https://pokeapi.co/api/v2/pokemon/?limit=150').then(function (response) {
            return response.json()
        }).then(function (json) {
            json.results.forEach(function (pokemonitem) {
                let pokemon = {
                    name: pokemonitem.name,
                    detailsUrl: pokemonitem.url
                };
                add(pokemon);
            });
        }).catch(function (error) {
          console.log(error);
        })
    }

    // load details about a certain pokemon
    function loadDetails(pokemon) {

        return fetch(pokemon.detailsUrl).then(function (response) {
            return response.json();
        }).then(function (details) {
            pokemon.imageUrl = details.sprites.front_default;
            pokemon.height = details.height;
            pokemon.types = details.types;
        }).catch(function (error) {
            console.log(error);
        })
    }

    function showDetails(pokemon) {
        loadDetails(pokemon).then(function () {
            pokemonInfoInModal(pokemon);
        });
    }

    function pokemonInfoInModal(pokemon) {

        let modalTitle = $('.modal-title');
        let pokemonInfo = $('.modal-body');

        modalTitle.empty();
        pokemonInfo.empty();

        modalTitle.text(pokemon.name.toUpperCase());

        let pokemonHeight = document.createElement('p');
        pokemonHeight.classList.add('pokemon-height');

        let pokemonImg = document.createElement('IMG');
        pokemonImg.classList.add('pokemon-image');

        pokemonHeight.innerText = `Height: ${pokemon.height}`;
        pokemonImg.setAttribute('src', pokemon.imageUrl);
        pokemonImg.setAttribute('alt', 'pokemon picture');

        pokemonInfo.append(pokemonHeight);
        pokemonInfo.append(pokemonImg);
    }

    return {
        add: add,
        getAll: getAll,
        addListItem: addListItem,
        loadPokemonList: loadPokemonList,
        loadDetails: loadDetails
    }

})();




(function () {
    pokemonRepository.loadPokemonList().then(function (Response) {
        pokemonRepository.getAll().forEach(function (pokemon) {
            pokemonRepository.addListItem(pokemon);
        });
        let paginationInfo = pagination();

        $('#next').on('click', function() {
            let currentPage = $('.pagination>li.active').index();

            if (currentPage === paginationInfo[0]) {
                return false
            }
            else {
                currentPage++;

                $('#pagination li').removeClass('active');
                $('#pokemon-list .list-group-item').hide();
                let grandTotal = paginationInfo[1] * currentPage;


                for (let i = grandTotal - paginationInfo[1]; i < grandTotal; i++) {
                    $('#pokemon-list .list-group-item:eq(' + i + ')').show();
                }
                $('.pagination li.page-item:eq(' + (currentPage - 1) + ')').addClass('active');

            }
        });


        $('#previous').on('click', function() {
            let currentPage = $('.pagination>li.active').index();

            if (currentPage === 1) {
                return false
            } else {
                currentPage--;
                $('#pagination li').removeClass('active');
                $('#pokemon-list .list-group-item').hide();

                let grandTotal = paginationInfo[1] * currentPage;

                for (let i = grandTotal - paginationInfo[1]; i < grandTotal; i++) {
                    $('#pokemon-list .list-group-item:eq(' + i + ')').show();
                }
                $('.pagination li.page-item:eq(' + (currentPage - 1) + ')').addClass('active');
            }
        });
    });
})();
