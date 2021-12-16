let pokemonRepository = [];

pokemonRepository[0] = {
    name: 'Bulbasaur',
    height: 0.7,
    type: [
        'grass', 'poison'
    ]
}

pokemonRepository[1] = {
    name: 'Charizard',
    height: 1.7,
    type: [
        'fire', 'flying'
    ]
}

pokemonRepository[2] = {
    name: 'Kakuna',
    height: 0.6,
    type: [
        'bug', 'poison'
    ]
}

pokemonRepository[3] = {
    name: 'Pidgey',
    height: 0.3,
    type: [
        'flying', 'normal'
    ]
}


pokemonRepository[4] = {
    name: 'Pidgeot',
    height: 1.5,
    type: [
        'flying', 'normal'
    ]
}

// extracting the tallest pokemon in the database
let pokemonHeights = [];

pokemonRepository.forEach(heightArrayCreation);

function heightArrayCreation(pokemon) {
    pokemonHeights.push(pokemon.height);
}

let maxHeight = Math.max(...pokemonHeights);

// appending the list items(pokemons' list) to ul element
function function1() {
    let ul = document.getElementById("pokemonlist");

    // creating the pokemon list available in repository
    pokemonRepository.forEach(pokemonInfosRepresentation);

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
