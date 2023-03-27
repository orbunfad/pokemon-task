const API_URL = "./api/api.php";
const form = document.getElementById("edit-form");

// Fetch Pokemon details from the API using the given ID and populate the form with the data
async function fetchPokemonDetails(id) {
    const response = await fetch(
        `${API_URL}?method=get_pokemon_by_id&id=${id}`
    );
    const data = await response.json();
    populateForm(data);
}

// Populate the form fields with the given Pokemon data
function populateForm(pokemon) {
    document.getElementById("pokemon-id").value = pokemon.id;
    document.getElementById("pokemon-name").value = pokemon.name.english;
    document.getElementById("pokemon-type").value = pokemon.type.join(", ");

    document.getElementById("pokemon-base-hp").value = pokemon.base.HP;
    document.getElementById("pokemon-base-attack").value = pokemon.base.Attack;
    document.getElementById("pokemon-base-defense").value = pokemon.base.Defense;
    document.getElementById("pokemon-base-sp-attack").value = pokemon.base['Sp. Attack'];
    document.getElementById("pokemon-base-sp-defense").value = pokemon.base['Sp. Defense'];
    document.getElementById("pokemon-base-speed").value = pokemon.base.Speed;
}

// Handle the form submission, display an alert, and redirect to the Pokemon details page
async function handleFormSubmit(event) {
    event.preventDefault();

    alert("Pokemon updated successfully!");
    window.location.href = `details.html?id=${document.getElementById("pokemon-id").value
        }`;
}

// Add a 'submit' event listener to the form
form.addEventListener('submit', handleFormSubmit);

// Add an event listener and fetch Pokémon details when the page has loaded
window.addEventListener("DOMContentLoaded", () => {
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get("id");
    fetchPokemonDetails(id);
});