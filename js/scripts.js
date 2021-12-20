
//pokemonRepository creation and retrievement function
let pokemonRepository = (function () {

    // pokemonRepository creation
    let pokemonList = [];
    let pokemonApiUrl =  'https://pokeapi.co/api/v2/pokemon/?limit=150';

    //function to add new object (pokemon) to pokemonRepository
    function add(pokemon) {
        pokemonList.push(pokemon);
    }

    //function to retrieve the pokemons' list available in pokemonRepository
    function getAll() {
        return pokemonList
    }

    //function to create and represent the pokemon item in web browser
    function addListItem(pokemon) {
        let pokemonContainer = document.querySelector('.pokemon-list');
        let ul = pokemonContainer;
        let listItem = document.createElement('li');
        let button = document.createElement('button');
        button.innerText = pokemon.name;
        button.classList.add('pokemon');
        listItem.appendChild(button);
        //onclick functionality of listItem (pokemon name)
        onClick(button, pokemon);
        ul.appendChild(listItem);
    }

    //defining onclick function to represent the pokemon details on click event
    function onClick(button, pokemon) {
        button.addEventListener('click', function(event) {
            showDetails(pokemon);
        })
    }

    //load pokemons' list from an external API and add them into our repository
    function loadPokemonList() {
        return fetch('https://pokeapi.co/api/v2/pokemon/?limit=150').then(function (response) {
            return response.json()
        }).then(function (json) {
            json.results.forEach(function (pokemonitem) {
                let pokemon = {
                    name: pokemonitem.name,
                    detailsurl: pokemonitem.url
                };
                add(pokemon);
            });
        }).catch(function (error) {
          console.log(error);
        })
    }

    //load details about determined pokemon
    function loadDetails(pokemon) {
        return fetch(pokemon.detailsurl).then(function (response) {
            return response.json();
        }).then(function (details) {
            pokemon.imageUrl = details.sprites.front_default;
            pokemon.height = details.height;
            pokemon.types = details.types;
        }).catch(function (error) {
            console.log(error);
        })
    }

    //representation of detailed information for a determined pokemon
    function showDetails(pokemon) {
      loadDetails(pokemon);
      console.log(pokemon);
    }

    return {
        add: add,
        getAll: getAll,
        addListItem: addListItem,
        loadPokemonList: loadPokemonList,
        loadDetails: loadDetails
    }

})();

// representation of pokemon list in the web browser
(function function1() {
  pokemonRepository.loadPokemonList().then(function (Response) {
      pokemonRepository.getAll().forEach(function (pokemon) {
          pokemonRepository.addListItem(pokemon)
      });
  });
})();
