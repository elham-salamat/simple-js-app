
//pokemonRepository creation and retrievement function
let pokemonRepository = (function () {

    // pokemonRepository creation
    let pokemonList = [
        {
        name: 'Bulbasaur',
        height: 0.7,
        type: [
              'grass', 'poison'
        ]
        },
        {
        name: 'Charizard',
        height: 1.7,
        type: [
              'fire', 'flying'
        ]
        },
        {
        name: 'Kakuna',
        height: 0.6,
        type: [
              'bug', 'poison'
        ]
        },
        {
        name: 'Pidgey',
        height: 0.3,
        type: [
              'flying', 'normal'
        ]
        },
        {
        name: 'Pidgeot',
        height: 1.5,
        type: [
              'flying', 'normal'
        ]
        }
    ]

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
            console.log(`${pokemon.name} ${pokemon.height}`);
        })
    }

    return {
        add: add,
        getAll: getAll,
        addListItem: addListItem
    }

})();

// representation of pokemon list in the web browser
(function function1() {
    pokemonRepository.getAll().forEach(function (pokemon) {pokemonRepository.addListItem(pokemon)});
})();
