// Global Variables
const URLBase =  "https://rickandmortyapi.com/api/"
const endpointCharacter = "character/"
const endpointLocation = "location/"
const endpointEpisode = "episode/"

const queryId = (id) => document.getElementById(id)

// Requests
const getCharacters = () => {
    fetch(`${URLBase}${endpointCharacter}`)
        .then(res => res.json())
        .then(data => createCards(data.results))
        .catch(err => console.log(err))
}
getCharacters()

const getCharacter = (id) => {
    fetch(`${URLBase}${endpointCharacter}${id}`)
        .then(res => res.json())
        .then(data => createCharacterDetail(data))
        .catch(err => console.log(err))
}

const getFilteredCharacters = (gender) => {
    fetch(`${URLBase}${endpointCharacter}?gender=${gender}`)
        .then(res => res.json())
        .then(data => createCards(data.results))
        .catch(err => console.log(err))
}

// DOM
const handleSpinner = () => {
    queryId("container-cards").innerHTML = `
        <div class="d-flex justify-content-center">
            <div class="spinner-border" role="status">
                <span class="visually-hidden">Loading...</span>
            </div>
        </div>
        `
}

const createCards = (characters) => {
    handleSpinner()
    setTimeout(() => {
        queryId("container-cards").innerHTML = ""
        for (const character of characters) {
            const { created, name, gender, id, image, origin, species, status } = character
            queryId("container-cards").innerHTML += `
                <div class="card m-3" style="width: 18rem;">
                    <img src="${image}" class="card-img-top" alt="Imagen de ${name}">
                    <div class="card-body">
                        <h5 class="card-title">${name}</h5>
                        <p class="card-text">${created}</p>
                        <p class="card-text">${gender}</p>
                        <p class="card-text">${origin.name}</p>
                        <p class="card-text">${species}</p>
                        <p class="card-text">${status}</p>
                        <button class="btn btn-primary" id="btn" onclick="getCharacter(${id})">See Detail</button>
                    </div>
                </div>
                `
        }
    }, 2000)
}

const createCharacterDetail = (character) => {
    handleSpinner()
    setTimeout(() => {
        const { created, name, gender, image, origin, species, status } = character
        queryId("container-cards").innerHTML = `
            <div class="card mb-3" style="max-width: 540px;">
                <div class="row g-0">
                    <div class="col-md-4">
                    <img src="${image}" class="img-fluid rounded-start" alt="Imagen de ${name}">
                    </div>
                    <div class="col-md-8">
                        <div class="card-body">
                            <h5 class="card-title">${name}</h5>
                            <p class="card-text">${created}</p>
                            <p class="card-text">${gender}</p>
                            <p class="card-text">${origin.name}</p>
                            <p class="card-text">${species}</p>
                            <p class="card-text">${status}</p>
                        </div>
                    </div>
                </div>
            </div>
        `
    }, 2000)
}

// Events
queryId("btn-search").addEventListener("click", () => getFilteredCharacters(queryId("filterGender").value))