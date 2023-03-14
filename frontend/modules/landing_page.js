import config from "../conf/index.js";

async function init() {
  //Fetches list of all cities along with their images and description
  let cities = await fetchCities();

  //Updates the DOM with the cities
  if (cities) {
    cities.forEach((key) => {
      addCityToDOM(key.id, key.city, key.description, key.image);
    });
  }
}

//Implementation of fetch call
async function fetchCities() {
  try {
    let response = await fetch("http://43.205.39.92:8082/cities");
    return await response.json();
  } catch (err) {
    return null;
  }
}

//Implementation of DOM manipulation to add cities
// function addCityToDOM(id, city, description, image) {
//     // Create a new card element
//     const card = document.createElement("div");
//     card.classList.add("card", "col-sm-6", "col-lg-4", "mb-3");
  
//     // Create a new image element
//     const img = document.createElement("img");
//     img.src = image;
//     img.classList.add("card-img-top");
  
//     // Create a new card body element
//     const cardBody = document.createElement("div");
//     cardBody.classList.add("card-body");
  
//     // Create a new card title element
//     const cardTitle = document.createElement("h5");
//     cardTitle.classList.add("card-title");
//     cardTitle.textContent = city;
  
//     // Create a new card text element
//     const cardText = document.createElement("p");
//     cardText.classList.add("card-text");
//     cardText.textContent = description;
  
//     // Append the title and text to the card body
//     cardBody.appendChild(cardTitle);
//     cardBody.appendChild(cardText);
  
//     // Append the image and card body to the card
//     card.appendChild(img);
//     card.appendChild(cardBody);
  
//     // Append the card to the "data" div element
//     const dataDiv = document.getElementById("data");
//     dataDiv.appendChild(card);
// }

function addCityToDOM(id, city, description, image) {
  // Get the container element to add the new city card
  const container = document.getElementById('data');

  // Create the city card element
  const cityCard = document.createElement('div');
  cityCard.classList.add('col-6', 'col-lg-3', 'mb-3');

  // Create the card link element
  const cardLink = document.createElement('a');
  cardLink.id = id;
  cardLink.href = `/adventures/?city=${id}/`;

  // Create the card element
  const card = document.createElement('div');
  card.classList.add('card', 'adventure-card');

  // Create the card image element
  const cardImg = document.createElement('img');
  cardImg.src = image;
  cardImg.classList.add('card-img-top');
  cardImg.alt = city;

  // Create the card body element
  const cardBody = document.createElement('div');
  cardBody.classList.add('card-body', 'text-center', 'd-md-flex', 'justify-content-between');

  // Create the card title element
  const cardTitle = document.createElement('h5');
  cardTitle.classList.add('card-title');
  cardTitle.textContent = city;

  // Create the card description element
  const cardDescription = document.createElement('p');
  cardDescription.classList.add('card-text');
  cardDescription.textContent = description;

  // Append the card title and description to the card body
  cardBody.appendChild(cardTitle);
  cardBody.appendChild(cardDescription);

  // Append the card image and body to the card
  card.appendChild(cardImg);
  card.appendChild(cardBody);

  // Append the card to the card link
  cardLink.appendChild(card);

  // Append the card link to the city card
  cityCard.appendChild(cardLink);

  // Append the city card to the container
  container.appendChild(cityCard);
}

export { init, fetchCities, addCityToDOM };
