const pokemonName = document.querySelector(".pokemon_name")
const pokemonId = document.querySelector(".pokemon_id")
const pokemonImage = document.querySelector(".pokemon_image")

const form = document.querySelector(".form")
const inputSearch = document.querySelector(".input_search")
const btnPrev = document.querySelector(".btn-prev")
const btnNext = document.querySelector(".btn-next")

let searchPokemon = 1

const fetchPokemon = async (pokemon) => {
    const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
    if(APIResponse.status == 200){
        const data = await APIResponse.json()
        return data
    }
}

const renderPokemon = async (pokemon) => {
    pokemonName.innerHTML = "Loading..."
    pokemonId.innerHTML = "..."

    const data = await fetchPokemon(pokemon)

    if(data){
        if(data.id < 650){
            pokemonName.innerHTML = data.name
            pokemonId.innerHTML = data.id
            searchPokemon = data.id
            pokemonImage.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default']
            pokemonImage.style.display = "block"
        }else{
            pokemonImage.style.display = "None"
            pokemonName.innerHTML = "Not Found"
            pokemonId.innerHTML = "?"
        }
    }else{
        pokemonImage.style.display = "None"
        pokemonName.innerHTML = "Not Found"
        pokemonId.innerHTML = "?"
    }

    inputSearch.value = ""
}

form.addEventListener("submit", (event) => {
    event.preventDefault()
    renderPokemon(inputSearch.value.toLowerCase())
})

btnPrev.addEventListener("click", () => {
    if(searchPokemon>1){
        searchPokemon--
        renderPokemon(searchPokemon)
    }
    
})

btnNext.addEventListener("click", () => {
    if(searchPokemon<649){
        searchPokemon++
        renderPokemon(searchPokemon) 
    }
})

renderPokemon(searchPokemon)
