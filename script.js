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
              <button class="edit" onclick="editEvent(${index})">Edit</button>
              <button class="delete" onclick="deleteEvent(${index})">Delete</button>
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

// Function to edit event
function editEvent(index) {
  const events = JSON.parse(localStorage.getItem("events")) || [];
  const eventDiv = document.querySelector(
    `.schedule .event:nth-child(${index + 1})`
  );
  const edibtn = document.getElementsByClassName("edit");
  edibtn[0].style.display = "none";
  console.log(edibtn);
  const delbtn = document.getElementsByClassName("delete");
  delbtn[0].style.display = "none";

  // existing event details
  const eventNameElement = eventDiv.querySelector(".eve-name");
  const eventDateElement = eventDiv.querySelector(".eve-date");
  const eventTimeElement = eventDiv.querySelector(".eve-time");
  const eventDescElement = eventDiv.querySelector(".eve-desc");

  // input fields to replace the event details
  const nameInput = document.createElement("input");
  nameInput.type = "text";
  nameInput.value = eventNameElement.textContent;
  console.log(eventDateElement.textContent);
  const dateInput = document.createElement("input");
  dateInput.type = "date";
  dateInput.value = eventDateElement.textContent.split(": ")[1];

  const timeInput = document.createElement("input");
  timeInput.type = "time";
  timeInput.value = eventTimeElement.textContent.split(": ")[1];

  const descInput = document.createElement("textarea");
  descInput.textContent = eventDescElement.textContent.split(": ")[1];

  // Replace event details with input fields
  eventNameElement.textContent = "";
  eventNameElement.appendChild(nameInput);

  eventDateElement.textContent = "";
  eventDateElement.appendChild(dateInput);

  eventTimeElement.textContent = "";
  eventTimeElement.appendChild(timeInput);

  eventDescElement.textContent = "";
  eventDescElement.appendChild(descInput);

  // save button
  const saveButton = document.createElement("button");
  saveButton.setAttribute("class", "save");
  saveButton.textContent = "Save";
  saveButton.addEventListener("click", () => saveEditedEvent(index, events));
  eventDiv.appendChild(saveButton);
}

// Function to save edited event
function saveEditedEvent(index, events) {
  const eventDiv = document.querySelector(
    `.schedule .event:nth-child(${index + 1})`
  );
  const newName = eventDiv.querySelector(".eve-name input").value;
  const newDate = eventDiv.querySelector(".eve-date input").value;
  const newTime = eventDiv.querySelector(".eve-time input").value;
  const newDesc = eventDiv.querySelector(".eve-desc textarea").value;

  // Update the event in the events array
  events[index] = {
    name: newName,
    date: newDate,
    time: newTime,
    description: newDesc,
  };

  // Update localStorage
  localStorage.setItem("events", JSON.stringify(events));

  displaySchedule();
}

displaySchedule();
