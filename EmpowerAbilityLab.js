document.addEventListener("DOMContentLoaded", () => {
    // Tab switching
    const tabs = document.querySelectorAll(".tab-link");
    const tabContents = document.querySelectorAll(".tab-content");
  
    tabs.forEach(tab => {
      tab.addEventListener("click", () => {
        tabs.forEach(btn => btn.classList.remove("active"));
        tabContents.forEach(content => content.classList.remove("active"));
  
        tab.classList.add("active");
        document.getElementById(tab.dataset.tab).classList.add("active");
      });
    });
  
    // Show/Hide Event Description
    const inviteSpeakerCheckbox = document.getElementById("invite-speaker");
    const eventDescription = document.getElementById("event-description");
    const eventLabel = document.getElementById("event-label");
  
    inviteSpeakerCheckbox.addEventListener("change", () => {
      if (inviteSpeakerCheckbox.checked) {
        eventDescription.classList.remove("hidden");
        eventLabel.classList.remove("hidden");
      } else {
        eventDescription.classList.add("hidden");
        eventLabel.classList.add("hidden");
      }
    });
  
  // Form submission
// const form = document.getElementById("schedule-form");

// // Error container
// const errorContainer = document.createElement("div");
// errorContainer.id = "form-error";
// errorContainer.className = "alert alert-danger hidden";
// form.insertAdjacentElement("beforebegin", errorContainer);

// form.addEventListener("submit", (event) => {
//     event.preventDefault(); // Prevent the form from submitting
//     console.log("line 42")
//     const emailField = document.getElementById("email");
//     const emailValue = emailField.value.trim();
//     const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Simple regex for email validation

//     // Clear any previous error message
//     errorContainer.textContent = "";
//     errorContainer.classList.add("hidden");
//   console.log("line 50")
//     // Validate email
//     if (!emailPattern.test(emailValue)) {
//         errorContainer.textContent = "Please enter a valid email address.";
//         errorContainer.classList.remove("hidden");
//         emailField.focus();
//         return; // Stop the submission process
//     }

//     // If valid, proceed with submission
//     alert("Thank you! Your request has been submitted.");
//     form.reset();
// });
// Form submission
const form = document.getElementById("schedule-form");

// Error container
const errorContainer = document.createElement("div");
errorContainer.id = "form-error";
errorContainer.className = "alert alert-danger hidden";
form.insertAdjacentElement("beforebegin", errorContainer);

const emailField = document.getElementById("email");

// Function to validate email
function validateEmail(email) {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Simple regex for email validation
    return emailPattern.test(email.trim());
}

// Clear error on input change
emailField.addEventListener("input", () => {
    errorContainer.textContent = "";
    errorContainer.classList.add("hidden");
});

// Form submission event
form.addEventListener("submit", (event) => {
    event.preventDefault(); // Prevent the form from submitting

    const emailValue = emailField.value;

    // Validate email
    if (!validateEmail(emailValue)) {
        errorContainer.textContent = "Please enter a valid email address.";
        errorContainer.classList.remove("hidden");
        emailField.focus();
        return; // Stop the submission process
    }

    // If valid, clear the error and proceed
    errorContainer.textContent = "";
    errorContainer.classList.add("hidden");

    alert("Thank you! Your request has been submitted.");
    form.reset();
});

    
  });
  