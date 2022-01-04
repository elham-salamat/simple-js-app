
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
        let pokemonContainer = document.querySelector('.pokemon-list');
        let ul = pokemonContainer;
        let listItem = document.createElement('li');
        let button = document.createElement('button');
        button.innerText = pokemon.name;
        button.classList.add('pokemon');
        listItem.appendChild(button);

        // onclick functionality of listItem (pokemon name)
        onClick(button, pokemon);

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

    // creating a modal to represent the detailed information for a certain pokemon
    function showDetailsModal(pokemon) {

        // removing all the information in modal container if there is any
        modalContainer.innerHTML = '';

        // creating the main box
        let pokemonDetails = document.createElement('div');
        pokemonDetails.classList.add('pokemon-details');

        // add modal content
        // creation of close button
        let closeButton = document.createElement('button');
        closeButton.classList.add('close-button');
        closeButton.innerText = "X";

        //defining an event listener for close button to hide the modal
        closeButton.addEventListener('click', hideDetailsModal);

        // adding info box
        let pokemonInfo = document.createElement('div');
        pokemonInfo.classList.add('pokemon-info');

        let pokemonName = document.createElement('h3');
        pokemonName.classList.add('modal-title');

        let pokemonHeight = document.createElement('p');
        pokemonHeight.classList.add('pokemon-height');

        let pokemonImg = document.createElement('IMG');
        pokemonImg.classList.add('pokemon-image');

        loadDetails(pokemon).then(function(){
            pokemonName.innerText = pokemon.name.toUpperCase();
            pokemonHeight.innerText = `Height: ${pokemon.height}`;
            pokemonImg.setAttribute('src', pokemon.imageUrl);
            pokemonImg.setAttribute('alt', 'pokemon picture');

          }) ;

        pokemonDetails.appendChild(closeButton);
        pokemonInfo.appendChild(pokemonName);
        pokemonInfo.appendChild(pokemonHeight);
        pokemonInfo.appendChild(pokemonImg);
        pokemonDetails.appendChild(pokemonInfo);
        modalContainer.appendChild(pokemonDetails);

        modalContainer.classList.add('is-visible');
    }

    //hiding modal container or detailed information of a certain pokemon
    function hideDetailsModal() {
      modalContainer.classList.remove('is-visible');
    }

    //defining onclick function to represent the pokemon details on click event
    function onClick(button, pokemon) {
        button.addEventListener('click', function(event) {
            showDetailsModal(pokemon);
        })
    }

    //defining an event listener for escape button to hide the modal
    window.addEventListener('keydown', function (event) {
      if (event.key === 'Escape' && modalContainer.classList.contains('is-visible')){
          hideDetailsModal();
      }
    });

    //defining an event listener for clicking outside the modal to hide the modal
    modalContainer.addEventListener('click', function (event) {
      let target = event.target;
      if (target == modalContainer) {
        hideDetailsModal();
      }
    });

    return {
        add: add,
        getAll: getAll,
        addListItem: addListItem,
        loadPokemonList: loadPokemonList,
        loadDetails: loadDetails
    }

})();

// showing the selected list on the browser
(function function1() {

    pokemonRepository.loadPokemonList().then(function (Response) {
        i = 0;
        pokemonRepository.getAll().forEach(function (pokemon) {
            // limiting the number of shown pokemon
            if (i <= 9) {
                pokemonRepository.addListItem(pokemon);
                i++;
            }
      });
  });
})();
