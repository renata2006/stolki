(() => {
   const button = document.querySelector(".js-main_navigation_mobile-button");
   const menu = document.querySelector(".js-main-navigation_menu");

   const toggleClass = () => {
       menu.classList.toggle("main-navigation_menu--open");
   };
   button.addEventListener("click", toggleClass);
   menu.addEventListener("click", toggleClass);

 
})();