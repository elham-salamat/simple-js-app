
let pokemonRepository = (function () {
    let pokemonList = [];

    function add(pokemon) {
        pokemonList.push(pokemon);
    }

    function getAll() {
        return pokemonList
    }

    return {
      add: add,
      getAll: getAll
    }

})();

pokemonRepository.add({
    name: 'Bulbasaur',
    height: 0.7,
    type: [
        'grass', 'poison'
    ]
});

pokemonRepository.add({
    name: 'Charizard',
    height: 1.7,
    type: [
        'fire', 'flying'
    ]
});

pokemonRepository.add({
    name: 'Kakuna',
    height: 0.6,
    type: [
        'bug', 'poison'
    ]
});

pokemonRepository.add({
    name: 'Pidgey',
    height: 0.3,
    type: [
        'flying', 'normal'
    ]
});

pokemonRepository.add({
    name: 'Pidgeot',
    height: 1.5,
    type: [
        'flying', 'normal'
    ]
});

// extracting the tallest pokemon in the pokemonRepository
let pokemonHeights = [];

pokemonRepository.getAll().forEach(heightArrayCreation);

function heightArrayCreation(pokemon) {
    pokemonHeights.push(pokemon.height);
}

let maxHeight = Math.max(...pokemonHeights);

// appending the list items(pokemons' list) to ul element
function function1() {
    let ul = document.getElementById("pokemonlist");

    // creating the pokemon list available in repository
    pokemonRepository.getAll().forEach(pokemonInfosRepresentation);

    function pokemonInfosRepresentation(pokemon) {
        let li = document.createElement("li");

        // highlighting the tallest pokemon
        if (pokemon.height !== maxHeight) {
            li.appendChild(document.createTextNode(`${pokemon.name} (height: ${pokemon.height})`));
        } else {
            li.appendChild(document.createTextNode(`${pokemon.name} (height: ${pokemon.height}): This is the tallest  pokeman in the list`));
        }

        ul.appendChild(li);
    }
}

function1();
