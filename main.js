// link for the API 
const endpoint = 'https://boardgamegeek.com/xmlapi2/hot?boardgame';

//Gets what's inside the ul in the HTMl to manipulate it
const boardGamesListElement = document.getElementById('boardGamesList');

//Function to fetch the information from the API
function fetchBoardGames() {
    return fetch(endpoint)
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
            console.error('Error fetching board games:', error);
            return [];
        });
}

//Function that handles the data fetched from the API to display it to the DOM 
function displayBoardGames() {
    fetchBoardGames().then((games) => {
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
    });
}

//Calls the function to display data, without this it'll be a blank DOM 
displayBoardGames();
