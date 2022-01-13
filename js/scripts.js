
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
        // listItem.classList.add('col-lg-4');
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
          // chessColor();
      });

  })();


  function getNumberOfItemsPerRow(pokemonList) {
      var counter = 0;
      var firstRowOffsetTop = pokemonList[0].offsetTop;
      pokemonList.forEach(function(square) {
          if (square.offsetTop === firstRowOffsetTop) {
              counter += 1;
          }
      });

      return counter;
  }

  function chessColor() {

      var squares = document.querySelectorAll('#pokemon-list>li');
      var itemsPerRow = getNumberOfItemsPerRow(squares);
      var classToAdd;
      var oddLine = true;

      squares.forEach(function(square, index) {

          if (itemsPerRow % 2) {
              classToAdd = index % 2 ? 'color1' : 'color2';
          } else {
              if (oddLine) {
                  classToAdd = index % 2 ? 'color1' : 'color2';
              } else {
                  classToAdd = index % 2 ? 'color2' : 'color1';
              }
          }

          if ((index + 1) % itemsPerRow === 0) {
              oddLine = !oddLine;
          }

          square.classList.add(classToAdd);
      });

}
