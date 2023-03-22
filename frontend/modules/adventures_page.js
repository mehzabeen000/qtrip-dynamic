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
      `http://65.2.67.204:8082/adventures?city=${city}`
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
  return list.filter((adventure) => {
    return adventure.duration >= low && adventure.duration <= high;
  });
}

//Implementation of filtering by category which takes in a list of adventures, list of categories to be filtered upon and returns a filtered list of adventures.
function filterByCategory(list, categoryList) {
  const filteredAdventures = list.filter((adventure) => {
    return categoryList.some((category) => adventure.category === category);
  });
  console.log(filteredAdventures);
  return filteredAdventures;
}

function filterFunction(list, filters) {
  if (filters?.duration && filters?.category?.length) {
    const [low, high] = filters.duration.split("-");
    list = list.filter((adventure) => {
      return (
        adventure.duration >= Number(low) &&
        adventure.duration <= Number(high) &&
        filters.category.some((category) => adventure.category === category)
      );
    });
    return list;
  }
  if (filters.duration && filters.duration !== "") {
    const [low, high] = filters.duration.split("-");
    list = filterByDuration(list, Number(low), Number(high));
    return list;
  }

  if (filters.category && filters.category.length > 0) {
    list = filterByCategory(list, filters.category);
  }
  return list;
}

//Implementation of localStorage API to save filters to local storage. This should get called everytime an onChange() happens in either of filter dropdowns
function saveFiltersToLocalStorage(filters) {
  // Convert filters object to string
  const filtersString = JSON.stringify(filters);
  // Save filters to localStorage under "adventureFilters" key
  localStorage.setItem("filters", filtersString);
  return true;
}

function getFiltersFromLocalStorage() {
  const filtersString = localStorage.getItem("filters");
  if (!filtersString || filtersString == "undefined") return null;
  const filters = JSON.parse(filtersString);
  return filters;
}

function generateFilterPillsAndUpdateDOM(filters) {
  const categoryList = document.getElementById("category-list");
  categoryList.innerHTML = "";

  filters.category.forEach((filter) => {
    const pill = document.createElement("div");
    pill.classList.add("category-filter");
    pill.textContent = filter;
    categoryList.appendChild(pill);
  });

  

  const clearButton = document.getElementById("category-select");
  clearButton.addEventListener("click", () => {
    categoryList.innerHTML = "";
  });

  const clearDurationButton = document.getElementById("duration-select");
  clearDurationButton.addEventListener("click", () => {
    categoryList.innerHTML = "";
  });
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
