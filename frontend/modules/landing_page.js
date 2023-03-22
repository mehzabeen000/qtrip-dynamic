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
    let response = await fetch("http://65.2.67.204:8082/cities");
    return await response.json();
  } catch (err) {
    return null;
  }
}

function addCityToDOM(id, city, description, image) {
  // Get the container element to add the new city card
  const container = document.getElementById('data');

  // Create the city card element
  const cityCard = document.createElement('div');
  cityCard.classList.add('col-6', 'col-lg-3', 'mb-3');

  // Create the card link element
  const cardLink = document.createElement('a');
  cardLink.id = id;
  cardLink.href = `pages/adventures/?city=${id}`;

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
