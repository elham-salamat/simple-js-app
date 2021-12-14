let repository = [];

repository[0] = {
    name: 'Bulbasaur',
    height: 0.7,
    type: [
        'grass', 'poison'
    ]
}

repository[1] = {
    name: 'Charizard',
    height: 1.7,
    type: [
        'fire', 'flying'
    ]
}

repository[2] = {
    name: 'Kakuna',
    height: 0.6,
    type: [
        'bug', 'poison'
    ]
}

repository[3] = {
    name: 'Pidgey',
    height: 0.3,
    type: [
        'flying', 'normal'
    ]
}


repository[4] = {
    name: 'Pidgeot',
    height: 1.5,
    type: [
        'flying', 'normal'
    ]
}

// extracting the tallest pokemon in the database
let pokemonHeights = [];

for(let i = 0; i < repository.length; i++) {
  pokemonHeights[i] = repository[i].height;
}

let maxHeight = Math.max(...pokemonHeights);

function function1() {
  let ul = document.getElementById("pokemonlist");

  // creating the pokemon list available in repository
  for (i = 0; i < repository.length; i++) {
      let li = document.createElement("li");

      // highlighting the tallest pokemon
      if (repository[i].height !== maxHeight) {
          li.appendChild(document.createTextNode(`${repository[i].name} (height: ${repository[i].height})`));
      } else {
        li.appendChild(document.createTextNode(`${repository[i].name} (height: ${repository[i].height}): This is the tallest  pokeman in the list`));
      }

      ul.appendChild(li);
  }

}

function1();
