/**
 * Portfolio Main Script (Arabic Version)
 * Refactored for robustness and cross-page compatibility
 */

document.addEventListener("DOMContentLoaded", () => {
    /* =================================== typing animation ================================= */
    const typingElement = document.querySelector(".typing");
    if (typingElement && typeof Typed !== 'undefined') {
        new Typed(".typing", {
            strings: ["مصمم مواقع", "مطور مواقع", "عمل حر"],
            typeSpeed: 100,
            backSpeed: 60,
            loop: true
        });
    }

    /* =================================== Aside / Navigation ================================= */
    const nav = document.querySelector(".nav");
    const navList = nav ? nav.querySelectorAll("li") : [];
    const allSections = document.querySelectorAll(".section");
    const navTogglerBtn = document.querySelector(".nav-toggler");
    const aside = document.querySelector(".aside");

    // Handle Navigation Clicks
    navList.forEach((li, index) => {
        const link = li.querySelector("a");
        if (link) {
            link.addEventListener("click", function(e) {
                const href = this.getAttribute("href");
                
                // Only handle internal links on the same page
                if (href.startsWith("#")) {
                    e.preventDefault();
                    const targetId = href.split("#")[1];
                    const targetSection = document.getElementById(targetId);
                    
                    if (targetSection) {
                        // Remove back-section from all
                        allSections.forEach(sec => sec.classList.remove("back-section"));
                        
                        // Add back-section to current active
                        const currentActive = document.querySelector(".section.active");
                        if (currentActive) {
                            currentActive.classList.add("back-section");
                        }

                        // Switch active class in nav
                        navList.forEach(item => item.querySelector("a").classList.remove("active"));
                        this.classList.add("active");

                        // Show section
                        allSections.forEach(sec => sec.classList.remove("active"));
                        targetSection.classList.add("active");

                        // Close sidebar on mobile
                        if (window.innerWidth < 1200 && aside.classList.contains("open")) {
                            toggleAside();
                        }
                    }
                }
            });
        }
    });

    // Sidebar Toggler
    if (navTogglerBtn && aside) {
        navTogglerBtn.addEventListener("click", toggleAside);
    }

    function toggleAside() {
        if (aside && navTogglerBtn) {
            aside.classList.toggle("open");
            navTogglerBtn.classList.toggle("open");
            allSections.forEach(sec => sec.classList.toggle("open"));
        }
    }

    // Hire Me Button
    const hireMeBtns = document.querySelectorAll(".hire-me");
    hireMeBtns.forEach(btn => {
        btn.addEventListener("click", function (e) {
            const href = this.getAttribute("href");
            if (href && href.startsWith("#")) {
                const targetId = href.split("#")[1];
                const targetSection = document.getElementById(targetId);
                if (targetSection) {
                    // Update Nav
                    navList.forEach(li => {
                        const a = li.querySelector("a");
                        if (a) {
                            a.classList.remove("active");
                            const linkHref = a.getAttribute("href");
                            if (linkHref === href || (linkHref.includes("#") && linkHref.split("#")[1] === targetId)) {
                                a.classList.add("active");
                            }
                        }
                    });

                    // Show Section
                    allSections.forEach(sec => sec.classList.remove("active"));
                    targetSection.classList.add("active");
                }
            }
        });
    });
});

// EmailJS Function (Global for onclick)
function sendMail() {
    const name = document.getElementById("name");
    const email = document.getElementById("email");
    const subject = document.getElementById("seubject");
    const message = document.getElementById("message");

    if (!name || !email || !subject || !message) return;

    const params = {
        name: name.value,
        email: email.value,
        seubject: subject.value,
        message: message.value,
    };

    const serviceID = "service_3vtz3ss";
    const templateID = "template_awje3wb";

    if (typeof emailjs !== 'undefined') {
        emailjs.send(serviceID, templateID, params)
            .then(res => {
                name.value = "";
                email.value = "";
                subject.value = "";
                message.value = "";
                alert("Your message sent successfully!!");
            })
            .catch(err => {
                console.error("EmailJS Error:", err);
                alert("Failed to send message. Please check console.");
            });
    } else {
        alert("EmailJS library not loaded!");
    }
}