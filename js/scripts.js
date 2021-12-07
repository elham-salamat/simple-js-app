let pokemonList = [];

pokemonList[0] = {
    name: 'Bulbasaur',
    height: 0.7,
    type: [
        'grass', 'poison'
    ]
}

pokemonList[1] = {
    name: 'Charizard',
    height: 1.7,
    type: [
        'fire', 'flying'
    ]
}

pokemonList[2] = {
    name: 'Kakuna',
    height: 0.6,
    type: [
        'bug', 'poison'
    ]
}

pokemonList[3] = {
    name: 'Pidgey',
    height: 0.3,
    type: [
        'flying', 'normal'
    ]
}


pokemonList[4] = {
    name: 'Pidgeot',
    height: 1.5,
    type: [
        'flying', 'normal'
    ]
}

for (let i = 0; i < pokemonList.length; i++) {
    document.write(pokemonList[i].name + '\n');
}
