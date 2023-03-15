import config from "../conf/index.js";

//Implementation to extract adventure ID from query params
function getAdventureIdFromURL(search) {
  const params = new URLSearchParams(search);
  return params.get("adventure");
}
//Implementation of fetch call with a paramterized input based on adventure ID
async function fetchAdventureDetails(adventureId) {
  try {
    let response = await fetch(
      `http://3.6.3.160:8082/adventures/detail?adventure=${adventureId}`
    );
    return await response.json();
  } catch (err) {
    return null;
  }
}

//Implementation of DOM manipulation to add adventure details to DOM
function addAdventureDetailsToDOM(adventure) {
  const nameEl = document.getElementById("adventure-name");
  const subtitleEl = document.getElementById("adventure-subtitle");
  const contentEl = document.getElementById("adventure-content");
  const photoGalleryEl = document.getElementById("photo-gallery");

  // Populate adventure details into HTML elements
  nameEl.innerHTML = adventure.name;
  subtitleEl.innerHTML = adventure.subtitle;
  contentEl.innerHTML = adventure.content;

  // Insert images into photo gallery
  for (let i = 0; i < adventure.images.length; i++) {
    const imageEl = document.createElement("div");
    imageEl.classList.add("activity-card-image");
    imageEl.style.backgroundImage = `url(${adventure.images[i]})`;
    photoGalleryEl.appendChild(imageEl);
  }
}

//Implementation of bootstrap gallery component
function addBootstrapPhotoGallery(images) {
  const photoGalleryEl = document.getElementById("photo-gallery");

  // Overwrite existing HTML content with Bootstrap carousel
  photoGalleryEl.innerHTML = `
    <div id="carousel" class="carousel slide" data-bs-ride="carousel">
      <div class="carousel-inner"></div>
      <button class="carousel-control-prev" type="button" data-bs-target="#carousel" data-bs-slide="prev">
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Previous</span>
      </button>
      <button class="carousel-control-next" type="button" data-bs-target="#carousel" data-bs-slide="next">
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Next</span>
      </button>
    </div>
  `;

  // Get carousel inner element
  const carouselInnerEl = document.querySelector("#carousel .carousel-inner");

  // Populate carousel inner element with images
  for (let i = 0; i < images.length; i++) {
    const imageEl = document.createElement("div");
    imageEl.classList.add("carousel-item");
    imageEl.classList.add("activity-card-image");
    if (i === 0) {
      imageEl.classList.add("active");
    }
    imageEl.style.backgroundImage = `url(${images[i]})`;
    carouselInnerEl.appendChild(imageEl);
  }
}

//Implementation of conditional rendering of DOM based on availability
function conditionalRenderingOfReservationPanel(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. If the adventure is already reserved, display the sold-out message.
}

//Implementation of reservation cost calculation based on persons
function calculateReservationCostAndUpdateDOM(adventure, persons) {
  // TODO: MODULE_RESERVATIONS
  // 1. Calculate the cost based on number of persons and update the reservation-cost field
}

//Implementation of reservation form submission
function captureFormSubmit(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. Capture the query details and make a POST API call using fetch() to make the reservation
  // 2. If the reservation is successful, show an alert with "Success!" and refresh the page. If the reservation fails, just show an alert with "Failed!".
}

//Implementation of success banner after reservation
function showBannerIfAlreadyReserved(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. If user has already reserved this adventure, show the reserved-banner, else don't
}

export {
  getAdventureIdFromURL,
  fetchAdventureDetails,
  addAdventureDetailsToDOM,
  addBootstrapPhotoGallery,
  conditionalRenderingOfReservationPanel,
  captureFormSubmit,
  calculateReservationCostAndUpdateDOM,
  showBannerIfAlreadyReserved,
};
