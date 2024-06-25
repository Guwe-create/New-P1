let characters = [];
let filmMain = "";
let planets = [];
let nameH1;
let birthYearSpan;
let heightSpan;
let massSpan;
let filmsDiv;
let planetDiv;

const baseUrl = `https://swapi2.azurewebsites.net/api`;

// Runs on page load
addEventListener('DOMContentLoaded', () => {
  const sp = new URLSearchParams(window.location.search)
  const id = sp.get('id')
  getFilm(id)
});

async function getFilm(id) {
    let film;
    try {
        film = await fetchFilm(id)
        film.planets = await fetchPlanets(film)
        film.characters = await fetchCharacters(film)
    }
    catch (ex) {
      console.error(`Error reading character ${id} data.`, ex.message);
    }

    console.log(film);
    renderCharacter(film);
  }

  async function fetchFilm(film) {
    let characterUrl = `${baseUrl}/films/${film}`;
    return await fetch(characterUrl)
      .then(res => res.json())
  }
  
  async function fetchPlanets(film) {
    const url = `${baseUrl}/films/${film?.id}/planets`;
    const planet = await fetch(url)
      .then(res => res.json())
    return planet;
  }
  
  async function fetchCharacters(film) {
    const url = `${baseUrl}/films/${film?.id}/characters`;
    const films = await fetch(url)
      .then(res => res.json())
    return films;
  }

  //Chracters and planets must be displayed 
  const renderCharacter = film => {
    document.title = `SWAPI - ${film?.name}`;  // Just to make the browser tab say their name
    nameH1.textContent = film?.planets;
    heightSpan.textContent = film?.characters;
    massSpan.textContent = film?.mass;
    birthYearSpan.textContent = film?.birth_year;
    homeworldSpan.innerHTML = `<a href="/planet.html?id=${film?.homeworld.id}">${character?.homeworld.name}</a>`;
    const filmsLis = film?.films?.map(film => `<li><a href="/film.html?id=${film.id}">${film.title}</li>`)
    filmsUl.innerHTML = filmsLis.join("");
  }



  
  
