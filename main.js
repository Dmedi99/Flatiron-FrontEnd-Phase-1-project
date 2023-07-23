// Function to display data in the HTML file
function displayData(boardGames) {
    const boardGamesListElement = document.getElementById('boardGamesList');
    const ul = document.createElement('ul');
  
    boardGames.forEach((boardGame) => {
      const li = document.createElement('li');
  
      // Create an image element for the thumbnail
      const thumbnailImg = document.createElement('img');
      thumbnailImg.src = boardGame.thumbnail;
      thumbnailImg.alt = boardGame.name;
      li.appendChild(thumbnailImg);
  
      // Create a span element for the year published
      const yearPublishedSpan = document.createElement('span');
      yearPublishedSpan.textContent = `Year Published: ${boardGame.yearPublished}`;
      li.appendChild(yearPublishedSpan);
  
      // Create a span element for the name
      const nameSpan = document.createElement('span');
      nameSpan.textContent = `Name: ${boardGame.name}`;
      li.appendChild(nameSpan);
  
      ul.appendChild(li);
    });
  
    boardGamesListElement.appendChild(ul);
  }

  
 // Function to fetch data from the API and handle errors
function fetchData() {
    const apiUrl = 'https://boardgamegeek.com/xmlapi2/hot?videogame';
  
    return fetch(apiUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.text();
      })
      .then((data) => {
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(data, 'text/xml');
        const items = xmlDoc.getElementsByTagName('item');
  
        const boardGames = [];
        for (let i = 0; i < items.length; i++) {
          const name = items[i].getElementsByTagName('name')[0].getAttribute('value');
          const thumbnail = items[i].getElementsByTagName('thumbnail').getAttribute('value'); // Get the thumbnail URL from the attribute
          const yearPublished = items[i].getElementsByTagName('yearpublished')[0]?.getAttribute('value');
          boardGames.push({ name, thumbnail, yearPublished });
        }
        return boardGames;
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        return [];
      });
  }
   
  
  