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
      `http://65.2.67.204:8082/adventures/detail?adventure=${adventureId}`
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
  const soldOutPanel = document.getElementById("reservation-panel-sold-out");
  const availablePanel = document.getElementById("reservation-panel-available");
  if (adventure.available) {
    soldOutPanel.style.display = "none";
    availablePanel.style.display = "block";
    const costPerHead = document.getElementById("reservation-person-cost");
    costPerHead.textContent = adventure.costPerHead;
  } else {
    availablePanel.style.display = "none";
    soldOutPanel.style.display = "block";
  }
}

function calculateReservationCostAndUpdateDOM(adventure, persons) {
  const totalCostElement = document.getElementById("reservation-cost");
  const costPerHead = adventure.costPerHead;
  const totalCost = costPerHead * persons;
  totalCostElement.textContent = totalCost;
}

//Implementation of reservation form submission
function captureFormSubmit(adventure) {
  myForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const formData = new FormData(myForm);
    formData.append("adventure", adventure.id);
    const formValues = Object.fromEntries(formData.entries());
    console.log(formValues);

    fetch(`http://65.2.67.204:8082/reservations/new`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formValues),
    })
      .then((response) => {
        if (response.ok) {
          alert("Success!");
          location.reload();
        } else {
          alert("Failed!");
          throw new Error("Failed!");
        }
      })
      .catch((error) => {
        console.log(error);
        alert(error.message);
      });
  });
}

function showBannerIfAlreadyReserved(adventure) {
  const banner = document.getElementById("reserved-banner");

  if (adventure.reserved) {
    banner.style.display = "block";
  } else {
    banner.style.display = "none";
  }
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
