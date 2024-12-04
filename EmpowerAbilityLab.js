document.addEventListener("DOMContentLoaded", () => {

  const tabLinks = Array.from(document.querySelectorAll(".tabBtn"));
  const tabPanels = Array.from(document.querySelectorAll(".tabPanel"));

  // Map of tab IDs to their corresponding page titles
    const pageTitles = {
      home: "Empower Ability Labs - Home",
      services: "Empower Ability Labs - Services",
      schedule: "Empower Ability Labs - Schedule a Call",
    };

  function selectTab(tabId, pushState = true) {
    const selectedTabLink = document.querySelector(`[data-tab="${tabId}"]`);
    const selectedPanelId = tabId + "TabPanel";

    // Loop through all tab links and panels
    tabLinks.forEach((link) => {
      const panelId = link.dataset.tab + "TabPanel";
      const panel = document.getElementById(panelId);

      if (link === selectedTabLink) {
        // Activate the selected tab and panel
        link.classList.add("active");
        link.setAttribute("aria-selected", "true");
        panel.classList.remove("hidden");
        panel.classList.add("active");
        panel.setAttribute("aria-hidden", "false");
      } else {
        // Deactivate other tabs and panels
        link.classList.remove("active");
        link.setAttribute("aria-selected", "false");
        panel.classList.add("hidden");
        panel.classList.remove("active");
        panel.setAttribute("aria-hidden", "true");
      }
    });

    // Update browser history
    if (pushState) {
      history.pushState({ tabId }, "", `#${tabId}`);
    }
    
    // Update the page title
     document.title = pageTitles[tabId] || "Empower Ability Labs";
  }

  // Attach click event to tab links
  tabLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault(); // Prevent default link behavior
      const tabId = link.dataset.tab;
      selectTab(tabId);
    });
  });

  // Handle "Back" and "Forward" button navigation
  window.addEventListener("popstate", (event) => {
    const state = event.state;
    if (state && state.tabId) {
      selectTab(state.tabId, false); // Don't push state again
    } else {
      // Default to the first tab if no state is available
      selectTab(tabLinks[0].dataset.tab, false);
    }
  });

  // Initialize the tab based on the URL hash or default to the first tab
  const initialTabId = window.location.hash.substring(1) || tabLinks[0].dataset.tab;
  selectTab(initialTabId, false);

    // const tabBtns = Array.from(document.querySelectorAll(".tabBtn"));
    // const tabPanels = Array.from(document.querySelectorAll(".tabPanel"));
  
    // function selectTab(e) {
    //   const selectedTabBtn = e.target;
    //   const selectedPanelId = selectedTabBtn.dataset.tab + "TabPanel";
  
    //   // Loop through all tab buttons and panels
    //   tabBtns.forEach((btn) => {
    //     const panelId = btn.dataset.tab + "TabPanel";
    //     const panel = document.getElementById(panelId);
  
    //     if (btn === selectedTabBtn) {
    //       // Activate the selected tab and panel
    //       btn.classList.add("active");
    //       btn.setAttribute("aria-selected", "true");
    //       panel.classList.remove("hidden");
    //       panel.classList.add("active");
    //       panel.setAttribute("aria-hidden", "false");
    //     } else {
    //       // Deactivate other tabs and panels
    //       btn.classList.remove("active");
    //       btn.setAttribute("aria-selected", "false");
    //       panel.classList.add("hidden");
    //       panel.classList.remove("active");
    //       panel.setAttribute("aria-hidden", "true");
    //     }
    //   });
    // }
  
    // // Attach click event to tab buttons
    // tabBtns.forEach((btn) => btn.addEventListener("click", selectTab));
 
  
  // === "Skip to Main Content" Link Logic ===
  const skipLink = document.querySelector(".skip-nav");
  if (skipLink) {
    skipLink.addEventListener("click", (e) => {
      e.preventDefault(); // Prevent default anchor behavior

      const homeTabBtn = document.getElementById("homeTabBtn");
      const homeTabPanel = document.getElementById("homeTabPanel");

      // Trigger tab selection
      homeTabBtn.click();

      // Focus on the main content for accessibility
      homeTabPanel.focus();
    });
  }

    // === Show/Hide Event Description Logic ===
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

  // === Form Submission Logic ===
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

  // === Modal Accessibility Logic ===
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
    


 
});
