const pokemonContainer = document.getElementById("pokemon-container");
const nextBtn = document.getElementById("next");
const prevBtn = document.getElementById("prev");
const pokemonNameEl = pokemonContainer.querySelector("h2");
const pokeImgEl = document.getElementById("img");
const pokeDescEl = document.getElementById("description");
let pokeNr = 1;

const url = `https://pokeapi.co/api/v2/pokemon/`;

const getData = () => {
  fetch(url + pokeNr)
    .then((data) => data.json())
    .then((poke) => {
      console.log(poke);
      
      const pokeName = poke.name.charAt(0).toUpperCase() + poke.name.slice(1);
      const pokeTypes = poke.types.map((nr) => nr.type.name).toString();
      const pokeAbilities = poke.abilities.map((nr) => nr.ability.name).toString();
      const pokeStats = poke.stats.map((nr) => nr.stat.name).toString();
      const pokeMoves = poke.moves.map((nr) => nr.move.name);

      let randPokeMoves = [];

      for (let i = 0; i < pokeMoves.length; i++) {
        let random = Math.floor(Math.random() * pokeMoves.length);
        randPokeMoves.push(pokeMoves[random]);
        if (randPokeMoves.length == 7) {
          break;
        }
      }

      pokemonNameEl.innerText = pokeName;
      pokeImgEl.innerHTML = `<img src="${poke.sprites.front_default}" width="320px">`;
      pokeDescEl.innerHTML = `
  <p><b>Name:</b> ${pokeName}</p>
  <p><b>Type:</b> ${pokeTypes}</p>
  <p><b>Stats:</b> ${pokeStats}</p>
  <p><b>Abilities:</b> ${pokeAbilities} </p>
  <p><b>Some Moves:</b> ${randPokeMoves.toString()}</p>
  `;
    });
};

nextBtn.addEventListener("click", () => {
  pokeNr++;
  getData();
});

prevBtn.addEventListener("click", () => {
  if (pokeNr > 1) {
    pokeNr--;
    getData();
  }
});

getData();
