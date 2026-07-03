/* ======================================== toggle style switcher ============================================= */
const styleSwitcherToggle = document.querySelector(".style-switcher-toggler");
styleSwitcherToggle.addEventListener("click", () =>
{
    document.querySelector(".style-switcher").classList.toggle("open");
})
// hide style switcher on scroll
// window.addEventListener("scroll", () =>
// {
//     if(document.querySelector(".style-switcher").classList.contains("open"))
//         {
//             document.querySelector(".style-switcher").classList.remove("open");
//         }
// })
 /* ======================================== theme colors ================================================== */
 const alternateStyles = document.querySelectorAll(".alternate-style");
 function setActiveStyle(colors)
 {
    alternateStyles.forEach((style) => {
        if(colors === style.getAttribute("title"))
        {
            style.removeAttribute("disabled");
        }
        else
        {
            style.setAttribute("disabled","true");
        }
    })
 }
  /* ======================================== theme Light and dark mode ================================================== */
  const dayNight = document.querySelector(".day-night");

  function updateDayNightIcon() {
      if (dayNight) {
          if (document.body.classList.contains("dark")) {
              dayNight.innerHTML = '<i class="fas fa-sun"></i>';
          } else {
              dayNight.innerHTML = '<img src="icon/icons8-night-24.png" alt="Night">';
          }
      }
  }

  if (dayNight) {
      dayNight.addEventListener("click", () => {
          document.body.classList.toggle("dark");
          updateDayNightIcon();
      });
  }

  window.addEventListener("load", () => {
      updateDayNightIcon();
  });

    /* ======================================== theme Light and dark mode ================================================== */
  const aren = document.querySelector(".ar-en");
  if (aren) {
      const arenIcon = aren.querySelector("i");
      if (arenIcon) {
          aren.addEventListener("click", () => {
              arenIcon.classList.toggle("fa-e");
              arenIcon.classList.toggle("fa-a");
              document.body.classList.toggle("switch");
          });
      }
  }
  window.addEventListener("load", () => {
      const aren = document.querySelector(".ar-en");
      if (aren) {
          const arenIcon = aren.querySelector("i");
          if (arenIcon) {
              if (document.body.classList.contains("switch")) {
                  arenIcon.classList.add("fa-e");
              } else {
                  arenIcon.classList.add("fa-a");
              }
          }
      }
  });