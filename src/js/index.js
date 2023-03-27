const API_URL = "./api/api.php";

const previouslyDisplayedIds = new Set(JSON.parse(localStorage.getItem('previouslyDisplayedIds') || '[]'));

// Display the list of Pokemon in the HTML
function displayPokemonList(pokemons) {
    const pokemonList = document.getElementById("pokemon-list");
    pokemonList.innerHTML = pokemons.length === 0
        ? "<tr><td colspan='2'>All Pokémon have been displayed.</td></tr>"
        : "<tr><th></th><th>Pokemon</th></tr>";

    if (pokemons.length > 0) {
        const pokemonTemplate = document.getElementById("pokemon-template").content;
        pokemons.forEach(pokemon => {
            const node = pokemonTemplate.cloneNode(true);
            node.querySelector("img").src = `${API_URL}?method=get_pokemon_image&id=${pokemon.id}`;
            node.querySelector("h2 a").textContent = pokemon.name.english;
            node.querySelector("h2 a").href = `details.html?id=${pokemon.id}`;
            pokemonList.appendChild(node);

            previouslyDisplayedIds.add(pokemon.id);
        });

        localStorage.setItem('previouslyDisplayedIds', JSON.stringify(Array.from(previouslyDisplayedIds)));
    }
}

// Fetch and display a random set of Pokemon from the API
async function fetchRandomPokemon(forceRefresh = false) {
    try {
        const displayedPokemon = localStorage.getItem('displayedPokemon');
        const data = !forceRefresh && displayedPokemon ? JSON.parse(displayedPokemon) : await getRandomPokemon();

        if (data.length === 0 && displayedPokemon) {
            localStorage.removeItem('displayedPokemon');
            localStorage.removeItem('previouslyDisplayedIds');
            previouslyDisplayedIds.clear();
        }

        localStorage.setItem('displayedPokemon', JSON.stringify(data));
        displayPokemonList(data);
    } catch (error) {
        console.error('Failed to fetch random Pokemon:', error);
        displayNotFoundMessage();
    }
}

// Send GET Requset
async function getRandomPokemon() {
    const response = await fetch(`${API_URL}?method=get_random_pokemon&exclude=${Array.from(previouslyDisplayedIds).join(',')}`);
    return response.json();
}

// Display a 'Not Found' message in the Pokemon list when no Pokémon are found
function displayNotFoundMessage() {
    const pokemonList = document.getElementById("pokemon-list");
    pokemonList.innerHTML = "<tr><td colspan='2'>Not Found Pokemons</td></tr>";
}

// Add event listeners and fetch random Pokemon when the page has loaded
window.addEventListener('DOMContentLoaded', () => {
    document.getElementById("refresh-button").addEventListener("click", () => fetchRandomPokemon(true));
    fetchRandomPokemon();
});