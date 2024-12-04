document.addEventListener("DOMContentLoaded", () => {


    const tabBtns = Array.from(document.querySelectorAll(".tabBtn"));
    const tabPanels = Array.from(document.querySelectorAll(".tabPanel"));
  
    function selectTab(e) {
      const selectedTabBtn = e.target;
      const selectedPanelId = selectedTabBtn.dataset.tab + "TabPanel";
  
      // Loop through all tab buttons and panels
      tabBtns.forEach((btn) => {
        const panelId = btn.dataset.tab + "TabPanel";
        const panel = document.getElementById(panelId);
  
        if (btn === selectedTabBtn) {
          // Activate the selected tab and panel
          btn.classList.add("active");
          btn.setAttribute("aria-selected", "true");
          panel.classList.remove("hidden");
          panel.classList.add("active");
          panel.setAttribute("aria-hidden", "false");
        } else {
          // Deactivate other tabs and panels
          btn.classList.remove("active");
          btn.setAttribute("aria-selected", "false");
          panel.classList.add("hidden");
          panel.classList.remove("active");
          panel.setAttribute("aria-hidden", "true");
        }
      });
    }
  
    // Attach click event to tab buttons
    tabBtns.forEach((btn) => btn.addEventListener("click", selectTab));
 
  

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
    
      // Handle accessibility when the modal is shown
      modalElement.addEventListener("shown.bs.modal", () => {
        modalElement.setAttribute("aria-hidden", "false");
        modalElement.setAttribute("aria-modal", "true");
        modalElement.focus();
      });
    
      // Handle accessibility when the modal is hidden
      modalElement.addEventListener("hidden.bs.modal", () => {
        modalElement.setAttribute("aria-hidden", "true");
        modalElement.removeAttribute("aria-modal");
        custButton.focus();
      });
    
      // Attach the click event to open the modal
      custButton.addEventListener("click", () => {
        bootstrapModal.show();
      });
    }
    


    // const custButton = document.getElementById("cust_btn");
    // const modalElement = document.getElementById("meetCommunityButton");

    // if (custButton && modalElement) {
    //     // Initialize the Bootstrap modal instance
    //     const bootstrapModal = new bootstrap.Modal(modalElement);

    //     // Optional: Log when modal is shown or hidden
    //     modalElement.addEventListener("shown.bs.modal", () => {
    //         console.log("Modal is now visible");
    //     });

    //     modalElement.addEventListener("hidden.bs.modal", () => {
    //         console.log("Modal is now hidden");
    //     });

    //     // Open modal programmatically (optional)
    //     custButton.addEventListener("click", () => {
    //         bootstrapModal.show();
    //     });
    // }
});
