const API_URL = "./api/api.php";

// Fetch Pokemon details from the API using the given ID and display them
async function fetchPokemonDetails(id) {
    try {
        const response = await fetch(`${API_URL}?method=get_pokemon_by_id&id=${id}`);
        const data = await response.json();
        displayPokemonDetails(data);
    } catch (error) {
        console.error('Failed to fetch Pokémon details:', error);
        displayErrorMessage();
    }
}

// Display the details of the given Pokemon in the HTML
function displayPokemonDetails(pokemon) {
    document.querySelector('.edit-button').href = `edit.html?id=${pokemon.id}`;
    document.querySelector(".pokemon-image").src = `${API_URL}?method=get_pokemon_image&id=${pokemon.id}`;
    document.querySelector(".pokemon-name").textContent = pokemon.name.english;
    document.querySelector(".pokemon-type").textContent = pokemon.type.join(', ');

    const baseStatsList = document.querySelector(".pokemon-base");
    Object.entries(pokemon.base).forEach(([key, value]) => {
        const li = document.createElement("li");
        li.innerHTML = `${key}: ${value}`;
        baseStatsList.appendChild(li);
    });
}

// Display an error message when the Pokemon details cannot be fetched or displayed
function displayErrorMessage() {
    document.body.innerHTML = ""; // Clear the existing page content

    const errorContainer = document.createElement("div");
    errorContainer.className = "error-message";
    errorContainer.textContent = "Something went wrong.";
    document.body.appendChild(errorContainer);

    const backButton = document.createElement("button");
    backButton.textContent = "Back to Home";
    backButton.className = "error-button";
    backButton.onclick = () => {
        window.location.href = "index.html"; // Redirect to the home page
    };
    document.body.appendChild(backButton);
}

// Add an event listener and fetch Pokémon details when the page has loaded
window.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id');
    fetchPokemonDetails(id);
});