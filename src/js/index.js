const API_URL = "./api/api.php";

// Display the list of Pokemon in the HTML
function displayPokemonList(pokemons) {
    const pokemonList = document.getElementById("pokemon-list");
    const pokemonTemplate = document.getElementById("pokemon-template").content;

    pokemonList.innerHTML = "<tr><th></th><th>Pokemon</th></tr>";
    pokemons.forEach(pokemon => {
        const node = pokemonTemplate.cloneNode(true);
        node.querySelector("img").src = `${API_URL}?method=get_pokemon_image&id=${pokemon.id}`;
        node.querySelector("h2 a").textContent = pokemon.name.english;
        node.querySelector("h2 a").href = `details.html?id=${pokemon.id}`;
        pokemonList.appendChild(node);
    });
}

// Display a 'Not Found' message in the Pokemon list when no Pokémon are found
function displayNotFoundMessage() {
    const pokemonList = document.getElementById("pokemon-list");
    pokemonList.innerHTML = "<tr><td colspan='2'>Not Found Pokemons</td></tr>";
}

// Fetch and display a random set of Pokemon from the API
async function fetchRandomPokemon() {
    try {
        const response = await fetch(`${API_URL}?method=get_random_pokemon`);
        const data = await response.json();
        displayPokemonList(data);
    } catch (error) {
        console.error('Failed to fetch random Pokémon:', error);
        displayNotFoundMessage();
    }
}

// Add event listeners and fetch random Pokemon when the page has loaded
window.addEventListener('DOMContentLoaded', () => {
    document.getElementById("refresh-button").addEventListener("click", fetchRandomPokemon);

    fetchRandomPokemon();
});