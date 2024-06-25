let nameH1;
let climateSpan;
let surfaceWaterSpan;
let diameterSpan;
let rotationPeriodSpan;
let terrainSpan;
let gravitySpan;
let orbitalPeriodSpan;
let populationSpan;
let filmsDiv;
let charactersDiv;
const baseUrl = `https://swapi2.azurewebsites.net/api`;

// Runs on page load
addEventListener('DOMContentLoaded', () => {
    nameH1 = document.querySelector('h1#planetName');
    climateSpan = document.querySelector('span#climate');
    surfaceWaterSpan = document.querySelector("span#surface_water");
    diameterSpan = document.querySelector("span#diameter");
    rotationPeriodSpan = document.querySelector("span#rotation_period");
    terrainSpan = document.querySelector("span#terrain");
    gravitySpan = document.querySelector("span#gravity");
    orbitalPeriodSpan = document.querySelector("span#orbital_period");
    populationSpan = document.querySelector("span#population");
    residentsUl = document.querySelector('#characters>ul')
    filmsUl = document.querySelector('#films>ul');
    const sp = new URLSearchParams(window.location.search);
    const id = sp.get('id');
    getPlanet(id);
});


async function getPlanet(id) {
    let planet;
    try {
      planet = await fetchPlanet(id)
      planet.characters = await fetchCharacters(planet)
      planet.films = await fetchFilms(planet)
    }
    catch (ex) {
      console.error(`Error reading character ${id} data.`, ex.message);
    }
    renderPlanet(planet);
  
  }
async function fetchPlanet(id) {
  let planetURL = `${baseUrl}/planets/${id}`;
  return await fetch(planetURL)
      .then(res => res.json())
  }

async function fetchCharacters(planet) {
  const characterUrl = `${baseUrl}/planets/${planet?.id}/characters`;
  const characters = await fetch(characterUrl)
      .then(res => res.json())
  return characters;
}

async function fetchFilms(planet) {
  const filmUrl = `${baseUrl}/planets/${planet?.id}/films`;
  const films = await fetch(filmUrl)
      .then(res => res.json())
  return films;
}
  
const renderPlanet = planet => {
    document.title = `SWAPI - ${planet?.name}`;  // Just to make the browser tab say their name
    nameH1.textContent = planet?.name;
    climateSpan.textContent = planet?.climate;
    surfaceWaterSpan.textContent = planet?.surface_water;
    diameterSpan.textContent = planet?.diameter;
    rotationPeriodSpan.textContent = planet?.rotation_period;
    terrainSpan.textContent = planet?.terrain;
    gravitySpan.textContent = planet?.gravity;
    orbitalPeriodSpan.textContent = planet?.orbital_period;
    populationSpan.textContent = planet?.population;
    const residentsLis = planet?.characters?.map(res => `<li><a href="/character.html?id=${res.id}">${res.name}</li>`);
    residentsUl.innerHTML = residentsLis.join("");
    const filmsLis = planet?.films?.map(film => `<li><a href="/film.html?id=${film.id}">${film.title}</li>`);
    filmsUl.innerHTML = filmsLis.join("");
}

//document.getElementById('planetName').innerHTML = ${};