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
    const form = document.getElementById("schedule-form");

    // Message container
    const messageContainer = document.createElement("div");
    messageContainer.id = "form-error";
    messageContainer.className = "alert hidden";
    form.insertAdjacentElement("beforebegin", messageContainer);

    const emailField = document.getElementById("email");

    // Function to validate email
    function validateEmail(email) {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Simple regex for email validation
        return emailPattern.test(email.trim());
    }

    // Clear message on input change
    emailField.addEventListener("input", () => {
        messageContainer.textContent = "";
        messageContainer.classList.add("hidden");
        messageContainer.classList.remove("alert-danger", "alert-success");
    });

    // Form submission event
    form.addEventListener("submit", (event) => {
        event.preventDefault(); // Prevent the form from submitting

        const emailValue = emailField.value;

        // Validate email
        if (!validateEmail(emailValue)) {
            messageContainer.textContent = "Please enter a valid email address.";
            messageContainer.classList.remove("hidden");
            messageContainer.classList.add("alert-danger");

            // Remove the error message after 60 seconds
            setTimeout(() => {
                messageContainer.textContent = "";
                messageContainer.classList.add("hidden");
                messageContainer.classList.remove("alert-danger");
            }, 60000); // 60 seconds in milliseconds

            emailField.focus();
            return; // Stop the submission process
        }

        // If valid, show success message
        messageContainer.textContent = "Thank you! Your request has been submitted successfully.";
        messageContainer.classList.remove("hidden");
        messageContainer.classList.remove("alert-danger");
        messageContainer.classList.add("alert-success");

        // Remove the success message after 60 seconds
        setTimeout(() => {
            messageContainer.textContent = "";
            messageContainer.classList.add("hidden");
            messageContainer.classList.remove("alert-success");
        }, 60000); // 60 seconds in milliseconds

        // Reset the form
        form.reset();
    });


    const custButton = document.getElementById("cust_btn");
    const modalElement = document.getElementById("meetCommunityButton");

    if (custButton && modalElement) {
        // Initialize the Bootstrap modal instance
        const bootstrapModal = new bootstrap.Modal(modalElement);

        // Optional: Log when modal is shown or hidden
        modalElement.addEventListener("shown.bs.modal", () => {
            console.log("Modal is now visible");
        });

        modalElement.addEventListener("hidden.bs.modal", () => {
            console.log("Modal is now hidden");
        });

        // Open modal programmatically (optional)
        custButton.addEventListener("click", () => {
            bootstrapModal.show();
        });
    }
});
