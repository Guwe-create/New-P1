let characters = [];
let filmMain = "";
let planets = [];
let title;
let theplanet;
let chars;
let filmsDiv;
let planetDiv;

const baseUrl = `https://swapi2.azurewebsites.net/api`;

// Runs on page load
addEventListener('DOMContentLoaded', () => {
  title = document.querySelector('h1#name');
  chars = document.querySelector('span#chars');
  mainSpace = document.querySelector('#planets>ul');
  //massSpan = document.querySelector('span#mass');
  //heightSpan = document.querySelector('span#height');
  theplanet = document.querySelector('span#homeworld');
  charactUI = document.querySelector('#films>ul');
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
    
    document.title = `SWAPI - ${film.title}`;  // Just to make the browser tab say their name
    title.textContent = film.title;
    
    for(var i = 0; i < film.planets.length; i++)
    theplanet.textContent = theplanet.textContent + ", " + film.planets[i].name;
    
    for(var i = 0; i < film.characters.length; i++)
      {
        
        chars.textContent = chars.textContent + ", " + film.characters[i].name;
      }
      
      const test = film?.planets?.map(filming => `<li><a href="/planet.html?id=${filming.id}">${filming.name}</li>`)
    //alert(test.join(""))
      mainSpace.innerHTML = test.join("");
    
    const filmsLis = film?.characters?.map(filming => `<li><a href="/character.html?id=${filming.id}">${filming.name}</li>`)
    
    charactUI.innerHTML = filmsLis.join("");
  }



  
  
