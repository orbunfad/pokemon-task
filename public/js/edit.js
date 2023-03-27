const API_URL = "./api/api.php";
const form = document.getElementById("edit-form");

async function fetchPokemonDetails(id) {
    const response = await fetch(
        `${API_URL}?method=get_pokemon_by_id&id=${id}`
    );
    const data = await response.json();
    populateForm(data);
}

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

async function handleFormSubmit(event) {
    event.preventDefault();

    alert("Pokemon updated successfully!");
    window.location.href = `details.html?id=${document.getElementById("pokemon-id").value
        }`;
}

form.addEventListener('submit', handleFormSubmit);

window.addEventListener("DOMContentLoaded", () => {
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get("id");
    fetchPokemonDetails(id);
});