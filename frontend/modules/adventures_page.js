import config from "../conf/index.js";

//Implementation to extract city from query params
function getCityFromURL(search) {
  const params = new URLSearchParams(search);
  return params.get("city");
}

//Implementation of fetch call with a paramterized input based on city
async function fetchAdventures(city) {
  try {
    let response = await fetch(
      `http://43.205.39.92:8082/adventures?city=${city}`
    );
    return await response.json();
  } catch (err) {
    return null;
  }
}

//Implementation of DOM manipulation to add adventures for the given city from list of adventures
function addAdventureToDOM(adventures) {
  const dataDiv = document.getElementById("data");

  adventures.forEach((adventure) => {
    // Create a card div for the adventure
    const cardDiv = document.createElement("div");
    cardDiv.classList.add("col-6", "col-lg-3", "mb-3");

    // Create a link to the adventure details page
    const link = document.createElement("a");
    link.id = adventure.id;
    link.href = `detail/?adventure=${adventure.id}`;

    const image = document.createElement("img");
    image.src = adventure.image;
    image.alt = adventure.name;
    // image.classList.add("img", "rounded");
    image.classList.add("img-fluid", "rounded");
    link.appendChild(image);

    // Create the card body
    const cardBodyDiv = document.createElement("div");
    cardBodyDiv.classList.add("activity-card", "text-center");
    link.appendChild(cardBodyDiv);

    // Create the card title
    const cardTitle = document.createElement("h5");
    cardTitle.classList.add("card-title");
    cardTitle.textContent = adventure.name;
    cardBodyDiv.appendChild(cardTitle);

    // Create the card text
    const cardText = document.createElement("p");
    cardText.classList.add("card-text");
    cardText.textContent = `₹${adventure.costPerHead}, ${adventure.duration} hours`;
    cardBodyDiv.appendChild(cardText);

    const bannerDiv = document.createElement("div");
    bannerDiv.classList.add("category-banner");
    bannerDiv.textContent = adventure.category;
    cardBodyDiv.appendChild(bannerDiv);

    // Add the card to the DOM
    cardDiv.appendChild(link);
    dataDiv.appendChild(cardDiv);
  });
}

//Implementation of filtering by duration which takes in a list of adventures, the lower bound and upper bound of duration and returns a filtered list of adventures.
function filterByDuration(list, low, high) {
  // TODO: MODULE_FILTERS
  // 1. Filter adventures based on Duration and return filtered list
}

//Implementation of filtering by category which takes in a list of adventures, list of categories to be filtered upon and returns a filtered list of adventures.
function filterByCategory(list, categoryList) {
  // TODO: MODULE_FILTERS
  // 1. Filter adventures based on their Category and return filtered list
}

// filters object looks like this filters = { duration: "", category: [] };

//Implementation of combined filter function that covers the following cases :
// 1. Filter by duration only
// 2. Filter by category only
// 3. Filter by duration and category together

function filterFunction(list, filters) {
  // TODO: MODULE_FILTERS
  // 1. Handle the 3 cases detailed in the comments above and return the filtered list of adventures
  // 2. Depending on which filters are needed, invoke the filterByDuration() and/or filterByCategory() methods

  // Place holder for functionality to work in the Stubs
  return list;
}

//Implementation of localStorage API to save filters to local storage. This should get called everytime an onChange() happens in either of filter dropdowns
function saveFiltersToLocalStorage(filters) {
  // TODO: MODULE_FILTERS
  // 1. Store the filters as a String to localStorage

  return true;
}

//Implementation of localStorage API to get filters from local storage. This should get called whenever the DOM is loaded.
function getFiltersFromLocalStorage() {
  // TODO: MODULE_FILTERS
  // 1. Get the filters from localStorage and return String read as an object

  // Place holder for functionality to work in the Stubs
  return null;
}

//Implementation of DOM manipulation to add the following filters to DOM :
// 1. Update duration filter with correct value
// 2. Update the category pills on the DOM

function generateFilterPillsAndUpdateDOM(filters) {
  // TODO: MODULE_FILTERS
  // 1. Use the filters given as input, update the Duration Filter value and Generate Category Pills
}
export {
  getCityFromURL,
  fetchAdventures,
  addAdventureToDOM,
  filterByDuration,
  filterByCategory,
  filterFunction,
  saveFiltersToLocalStorage,
  getFiltersFromLocalStorage,
  generateFilterPillsAndUpdateDOM,
};
