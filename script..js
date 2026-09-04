/* =========================================================
   MOBILE NAVIGATION
========================================================= */

function toggleMenu() {

    const menu = document.querySelector(".nav-links");

    if (!menu) {
        return;
    }

    menu.classList.toggle("mobile-menu");
}


/* =========================================================
   CLOSE MOBILE MENU AFTER CLICKING A LINK
========================================================= */

const navLinks = document.querySelectorAll(".nav-links a");

navLinks.forEach(function(link) {

    link.addEventListener("click", function() {

        const menu = document.querySelector(".nav-links");

        if (menu) {
            menu.classList.remove("mobile-menu");
        }

    });

});


/* =========================================================
   CONTACT FORM - FORMSPREE
========================================================= */

const contactForm = document.getElementById("contactForm");
const submitButton = document.getElementById("submitButton");
const formStatus = document.getElementById("formStatus");


if (contactForm) {

    contactForm.addEventListener("submit", async function(event) {

        /* Prevent normal page reload */
        event.preventDefault();


        /* Disable button while sending */
        if (submitButton) {

            submitButton.disabled = true;
            submitButton.textContent = "Sending...";

        }


        /* Clear previous status */
        if (formStatus) {

            formStatus.textContent = "";
            formStatus.className = "form-status";

        }


        /* Collect form data */
        const formData = new FormData(contactForm);


        try {

            /* Send data to Formspree */
            const response = await fetch(
                contactForm.action,
                {
                    method: "POST",
                    body: formData,
                    headers: {
                        "Accept": "application/json"
                    }
                }
            );


            /* =================================================
               SUCCESS
            ================================================= */

            if (response.ok) {

                if (formStatus) {

                    formStatus.textContent =
                        "✓ Message sent successfully! I'll get back to you soon.";

                    formStatus.classList.add("success");

                }


                /* Clear form */
                contactForm.reset();

            }


            /* =================================================
               ERROR
            ================================================= */

            else {

                let data = null;

                try {

                    data = await response.json();

                } catch (error) {

                    data = null;

                }


                if (formStatus) {

                    if (data && data.errors) {

                        formStatus.textContent =
                            data.errors
                                .map(function(error) {
                                    return error.message;
                                })
                                .join(", ");

                    } else {

                        formStatus.textContent =
                            "Something went wrong. Please try again.";

                    }

                    formStatus.classList.add("error");

                }

            }

        }


        /* =====================================================
           NETWORK ERROR
        ===================================================== */

        catch (error) {

            console.error("Form submission error:", error);


            if (formStatus) {

                formStatus.textContent =
                    "Unable to send the message. Please check your internet connection and try again.";

                formStatus.classList.add("error");

            }

        }


        /* =====================================================
           RESTORE BUTTON
        ===================================================== */

        finally {

            if (submitButton) {

                submitButton.disabled = false;
                submitButton.textContent = "Send Message";

            }

        }

    });

}