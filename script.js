let scheduleDiv = document.querySelector(".schedule");

// Getting present time
let currentDate = new Date();
let time24hr = currentDate.toLocaleTimeString("en-US", {
  hour12: false,
  timeZone: "IST",
});
let time12hr = currentDate.toLocaleTimeString("en-US", {
  hour12: true,
  timeZone: "IST",
});
let current24hr = time24hr.slice(0, 5);

let time = 1;
if (time12hr.length == 10) {
  time = time12hr.slice(0, 4) + " " + time12hr.slice(-2);
} else if (time12hr.length == 11) {
  time = time12hr.slice(0, 5) + " " + time12hr.slice(-2);
}

// Function to display events on the page
function displaySchedule() {
  scheduleDiv.innerHTML = "";

  // Getting events from localStorage
  const events = JSON.parse(localStorage.getItem("events"));

  // Check if there are events and if there are events loop through each event
  if (events && events.length > 0) {
    events.forEach((event, index) => {
      const eventDiv = document.createElement("div");
      eventDiv.setAttribute("class", "event");
      eventDiv.innerHTML = `
              <h3 class="eve-name">${event.name}</h3>
              <p class="eve-date">Date: ${event.date}</p>
              <p class="eve-time">Time: ${event.time}</p>
              <p class="eve-desc">Description: ${event.description}</p>
              <button onclick="deleteEvent(${index})">Delete</button>
              <hr>
            `;
      scheduleDiv.appendChild(eventDiv);
      if (current24hr == event.time)
        alert(
          (
            event.name +
            " is scheduled at " +
            time +
            " on " +
            event.date
          ).toUpperCase()
        );
    });
  } else {
    // If there are no events
    scheduleDiv.innerHTML = "<p class = 'none'>No events scheduled.</p>";
  }
}

// Form submission
document.forms[0].addEventListener("submit", function (e) {
  e.preventDefault(); // Prevent default form submission
  const eventName = document.getElementById("event-name").value;
  const eventDate = document.getElementById("event-date").value;
  const eventTime = document.getElementById("event-time").value;
  const eventDescription = document.getElementById("event-description").value;

  // calling add event function
  addEvent(eventName, eventDate, eventTime, eventDescription);

  // Display the updated schedule
  displaySchedule();

  // Resetting the form
  document.forms[0].reset();
});

// Function to add event
function addEvent(name, date, time, description) {
  // Getting existing events or initialize an empty array
  let events = JSON.parse(localStorage.getItem("events")) || [];

  // Adding new event to the array
  events.push({ name, date, time, description });

  // Saving updated events array to localStorage
  localStorage.setItem("events", JSON.stringify(events));
}

// Function to delete event
function deleteEvent(index) {
  // Get existing events from localStorage
  let events = JSON.parse(localStorage.getItem("events")) || [];

  events.splice(index, 1);

  localStorage.setItem("events", JSON.stringify(events));

  // Display the updated schedule
  displaySchedule();
}

displaySchedule();
