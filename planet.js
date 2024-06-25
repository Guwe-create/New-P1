//const sp = new URLSearchParams(window.location.search);
//const id = sp.get('id');
//console.log(id);

let nameH1;
//let birthYearSpan;
//let heightSpan;
//let massSpan;
//let filmsDiv;
//let planetDiv;

// Runs on page load
addEventListener('DOMContentLoaded', () => {
    nameH1 = document.querySelector('h1#name');
    //birthYearSpan = document.querySelector('span#birth_year');
    //massSpan = document.querySelector('span#mass');
    //heightSpan = document.querySelector('span#height');
    //homeworldSpan = document.querySelector('span#homeworld');
    //filmsUl = document.querySelector('#films>ul');
    const sp = new URLSearchParams(window.location.search)
    const id = sp.get('id')
    getCharacter(id)
  });


async function getCharacter(id) {
    let character;
    try {
      character = await fetchCharacter(id)
      character.homeworld = await fetchHomeworld(character)
      character.films = await fetchFilms(character)
    }
    catch (ex) {
      console.error(`Error reading character ${id} data.`, ex.message);
    }
    renderCharacter(character);
  
  }
async function fetchPlanet(id) {
let characterUrl = `${baseUrl}/characters/${id}`;
return await fetch(characterUrl)
    .then(res => res.json())
}

async function fetchCharacters(planet) {
const url = `${baseUrl}/planets/${planet?.id}/characters`;
const characters = await fetch(url)
    .then(res => res.json())
return characters;
}

async function fetchFilms(planet) {
const url = `${baseUrl}/planets/${planet?.id}/films`;
const films = await fetch(url)
    .then(res => res.json())
return films;
}
  
const renderPlanet = planet => {
    document.title = `SWAPI - ${planet?.name}`;  // Just to make the browser tab say their name
    nameH1.textContent = planet?.name;
    //heightSpan.textContent = planet?.height;
    //massSpan.textContent = planet?.mass;
    //birthYearSpan.textContent = planet?.birth_year;
    //homeworldSpan.innerHTML = `<a href="/planet.html?id=${character?.homeworld.id}">${character?.homeworld.name}</a>`;
    //const filmsLis = character?.films?.map(film => `<li><a href="/film.html?id=${film.id}">${film.title}</li>`)
    //filmsUl.innerHTML = filmsLis.join("");
}

  //document.getElementById('planetName').innerHTML = ${};
  

//fetch('https://swapi2.azurewebsites.net/api/planets/{$id}')
//    .then(response => response.json())
//    .then(data => console.log('GET:', data))
//    .catch((error) => console.error('Error:', error));