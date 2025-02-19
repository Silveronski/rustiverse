document.addEventListener("DOMContentLoaded", async () => {
  try {
    const resposne = await fetch("navbar.html");
    const data = await resposne.text();
    document.getElementById("navbar-container").innerHTML = data;
  } catch (error) {
    console.error("Error loading the navbar", error);
  }

  const navbarContainer = document.querySelector(".navbar ul");
  navbarContainer.addEventListener("mouseenter", handleNavbarEnter);
  navbarContainer.addEventListener("touchstart", handleNavbarEnter);

  function handleNavbarEnter() {
    handleDragEnd();
    if (currentCardShowing.length !== 0) {
      currentCardShowing[0].hideMonumentCard();
    }
  }

  const mobileMenuOpener = document.getElementById("mobile-menu");
  const navbar = document.querySelector("#navbar-container .navbar ul");
  const mobileMenuCloser = document.querySelector(
    "#navbar-container .navbar ul .close-navbar"
  );
  let isMenuOpen = false;

  mobileMenuOpener.addEventListener("click", openNavbarMenu);
  mobileMenuCloser.addEventListener("click", closeNavbarMenu);

  function openNavbarMenu() {
    if (!isMenuTransitioning) {
      navbar.style.animation = "slideInFromRight 0.5s ease";
      navbar.style.display = "block";
      isMenuTransitioning = true;
      isMenuOpen = true;
      if (currentCardShowing.length !== 0) {
        currentCardShowing[0].hideMonumentCard();
      }
    }
  }

  function closeNavbarMenu() {
    navbar.style.animation = "slideInFromLeft 0.5s ease";
    navbar.addEventListener("animationend", onAnimationEnd, { once: true });
  }

  function onAnimationEnd() {
    navbar.style.display = "none";
    isMenuTransitioning = false;
    isMenuOpen = false;
  }

  window.addEventListener("resize", () => {
    if (window.innerWidth >= 768) {
      navbar.style.display = "flex";
    } else {
      if (isMenuOpen) {
        closeNavbarMenu();
      }
    }
  });

  const logo = document.getElementById("logo");
  logo.addEventListener("click", closeNavbarMenuFromLogo);

  function closeNavbarMenuFromLogo(e) {
    if (window.location.href.includes("index.html")) {
      if (isMenuOpen) {
        e.preventDefault();
        closeNavbarMenu();
      }
      else {
        e.preventDefault();
      }
    }
  }

});
