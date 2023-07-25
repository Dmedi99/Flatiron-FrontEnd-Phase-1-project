//variable that holds the API link 
const API = './db.json';

//variables that search the HTML for specific Ids 
const boardGamesListElement = document.getElementById('boardGamesList');
const searchForm = document.getElementById('searchForm');
const searchNameInput = document.getElementById('searchName');
const wishlistElement = document.getElementById('wishlist');

//function that fetches the data from the db.json and catches error if any 
function fetchBoardGames() {
    return fetch(API)
      .then((response) => response.json()) 
      .then((data) => data.boardGames) 
      .catch((error) => {
        console.error('Error fetching board games from API', error);
        return [];
      });
  }

//function that obtains the clicked games contents and places them in a list to then display in wishlist ul
function handleGameClick(event) {
    const gameName = event.target.innerText; 
  
    const wishlistItem = document.createElement('li');
    wishlistItem.innerText = gameName;
    wishlistElement.appendChild(wishlistItem);
  }

// Function that adds a click event listener to each game item in the board games list
function addGameClickListeners() {
    const gameItems = boardGamesListElement.getElementsByTagName('li');
    Array.from(gameItems).forEach((item) => {
        item.addEventListener('click', handleGameClick);
    });
}

function displayBoardGames(games) {
  boardGamesListElement.innerHTML = '';
  if (games && games.length > 0) {
    games.forEach((game) => {
      const listItem = document.createElement('li');
      listItem.innerHTML = `
        <strong>${game.name}</strong> (${game.players} players)<br>
        Playtime: ${game.playtime}<br>
        Publisher: ${game.publisher}<br>
        Rating: ${game.rating}
      `;
      boardGamesListElement.appendChild(listItem);
    });
  } else {
    const listItem = document.createElement('li');
    listItem.innerText = 'No board games found.';
    boardGamesListElement.appendChild(listItem);
  }
  addGameClickListeners(); // This function is added here so the event listener is added after the data is displayed in the DOM
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

//Calls the fetchBoardGames function to display the information from the API to the DOM
fetchBoardGames().then((games) => {
    displayBoardGames(games);
});
