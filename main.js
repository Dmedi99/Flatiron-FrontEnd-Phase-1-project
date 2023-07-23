//variable that holds the API link 
const API = 'https://boardgamegeek.com/xmlapi2/hot?boardgame';

//variables that search the HTML for specific Ids 
const boardGamesListElement = document.getElementById('boardGamesList');
const searchForm = document.getElementById('searchForm');
const searchNameInput = document.getElementById('searchName');


//function that fetches the data from the API and catches error if any 
function fetchBoardGames() {
    return fetch(API)
        .then((response) => response.text())
        .then((data) => {
            const parser = new DOMParser();
            const xmlDoc = parser.parseFromString(data, 'text/xml');
            const items = xmlDoc.getElementsByTagName('item');
            return Array.from(items).map((item) => ({
                name: item.getElementsByTagName('name')[0].getAttribute('value'),
                yearPublished: item.getElementsByTagName('yearpublished')[0].getAttribute('value')
            }));
        })
        .catch((error) => {
            console.error('Error fetching board games from API', error);
            return [];
        });
}

//Function that displays the data from the fetch onto the DOM
function displayBoardGames(games) {
    boardGamesListElement.innerHTML = '';
    if (games && games.length > 0) {
        games.forEach((game) => {
            const listItem = document.createElement('li');
            listItem.innerText = `${game.name} (${game.yearPublished})`;
            boardGamesListElement.appendChild(listItem);
        });
    } else {
        const listItem = document.createElement('li');
        listItem.innerText = 'No hot board games found.';
        boardGamesListElement.appendChild(listItem);
    }
}

//Function that takes the array of the 'games' and 'searchTerm as inputs and returns a new array containing the matching search criteria 
function filterBoardGames(games, searchTerm) {
    return games.filter((game) => game.name.toLowerCase().includes(searchTerm.toLowerCase()));
}

// Event Handler for the search form submission. Prevents Default. It gets the input put in the search form
// it then calls the fetchBoardGames function to get the list of games in the API then the filterBoardGames
// function to filter the games based on the search input. Finally it calls displayBoardGames with the filtered list of the games

function handleSearch(event) {
    event.preventDefault();
    const searchTerm = searchNameInput.value.trim();


    fetchBoardGames()
        .then((games) => {
            const filteredGames = filterBoardGames(games, searchTerm);
            displayBoardGames(filteredGames);
        })
        .catch((error) => {
            console.error('Error fetching board games:', error);
        });
}

//Eventlistner that is runs the handleSearch function when the form is submitted
searchForm.addEventListener('submit', handleSearch);