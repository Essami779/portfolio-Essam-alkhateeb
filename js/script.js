/**
 * Portfolio Main Script
 * Refactored for robustness and cross-page compatibility
 */

document.addEventListener("DOMContentLoaded", () => {
    /* =================================== typing animation ================================= */
    const typingElement = document.querySelector(".typing");
    if (typingElement && typeof Typed !== 'undefined') {
        new Typed(".typing", {
            strings: typingElement.classList.contains("ar") ? ["مصمم مواقع", "مصمم تطبيقات", "مطور فلاتر", "مطور مواقع", "عمل حر"] : ["Web Designer", "App Designer", "Flutter Developer", "Web Developer", "Freelancer"],
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

// EmailJS Function (Global for the contact form)
function sendMail(event) {
    if (event) event.preventDefault();

    const form = document.getElementById("contact-form");
    const name = document.getElementById("name");
    const email = document.getElementById("email");
    const subject = document.getElementById("subject");
    const message = document.getElementById("message");
    const status = document.getElementById("form-status");
    const submitButton = form ? form.querySelector('button[type="submit"]') : null;
    const isArabic = document.documentElement.lang === "ar";

    if (!form || !name || !email || !subject || !message) return;
    if (!form.checkValidity()) {
        form.reportValidity();
        return;
    }
    if (typeof emailjs === "undefined") {
        if (status) status.textContent = isArabic ? "تعذر تحميل خدمة الإرسال. حاول مرة أخرى لاحقًا." : "The email service could not be loaded. Please try again later.";
        return;
    }

    const params = {
        name: name.value.trim(),
        email: email.value.trim(),
        subject: subject.value.trim(),
        seubject: subject.value.trim(),
        message: message.value.trim()
    };
    const serviceID = "service_3vtz3ss";
    const templateID = "template_awje3wb";

    if (submitButton) submitButton.disabled = true;
    if (status) status.textContent = isArabic ? "جارٍ إرسال رسالتك..." : "Sending your message...";

    emailjs.send(serviceID, templateID, params)
        .then(() => {
            form.reset();
            if (status) status.textContent = isArabic ? "تم إرسال رسالتك بنجاح. شكرًا لتواصلك." : "Your message was sent successfully. Thank you for reaching out.";
        })
        .catch((error) => {
            console.error("EmailJS Error:", error);
            if (status) status.textContent = isArabic ? "تعذر إرسال الرسالة. يرجى المحاولة لاحقًا." : "Your message could not be sent. Please try again later.";
        })
        .finally(() => {
            if (submitButton) submitButton.disabled = false;
        });
}