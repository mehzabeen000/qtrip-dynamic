import config from "../conf/index.js";

//Implementation of fetch call to fetch all reservations
async function fetchReservations() {
  try {
    let response = await fetch(
      `http://65.2.67.204:8082/reservations`
    );
    return await response.json();
  } catch (err) {
    return null;
}
}

//Function to add reservations to the table. Also; in case of no reservations, display the no-reservation-banner, else hide it.
function addReservationToTable(reservations) {
  console.log(reservations)

  const table = document.getElementById("reservation-table");
  const banner = document.getElementById("no-reservation-banner");
  const tableParent = document.getElementById("reservation-table-parent");
  
  if (reservations.length === 0) {
    banner.style.display = "block";
    tableParent.style.display = "none";
  } else {
    banner.style.display = "none";
    tableParent.style.display = "block";

    for (const reservation of reservations) {
      const row = table.insertRow();
      const id = row.insertCell();
      const name = row.insertCell();
      const adventureName = row.insertCell();
      const persons = row.insertCell();
      const bookingDate = row.insertCell();
      const price = row.insertCell();
      const bookingTime = row.insertCell();
      const visitButton = row.insertCell();
      const visitLink = document.createElement("a");

      const date = new Date(reservation.date).toLocaleDateString("en-IN", { year: 'numeric', month: 'numeric', day: 'numeric' });
      const time = new Date(reservation.time).toLocaleDateString("en-IN", { year: 'numeric', month: 'long', day: 'numeric' }) + ", " + new Date(reservation.time).toLocaleTimeString("en-IN", { hour: 'numeric', minute: 'numeric', second: "numeric" });
      
      id.innerHTML = reservation.id;
      name.innerHTML = reservation.name;
      adventureName.innerHTML = reservation.adventureName;
      persons.innerHTML = reservation.person;
      bookingDate.innerHTML = date;
      price.innerHTML = reservation.price;
      bookingTime.innerHTML = time;
      
      visitButton.id = reservation.id;
      visitLink.href = `/frontend/pages/adventures/detail/?adventure=${reservation.adventure}`;
      visitLink.innerHTML = "Visit Adventure";
      visitLink.classList.add("reservation-visit-button");
      visitButton.appendChild(visitLink);
    }
  }
}

export { fetchReservations, addReservationToTable };
