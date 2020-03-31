(() => {
const button = document.querySelector(".js-navigation_mobile_button");
const menu = document.querySelector(".js-navigation_box");


const taggleClass = () => {
menu.classList.toggle("navigation_box--open")
};

button.addEventListener("click", taggleClass);
menu.addEventListener("click", taggleClass);
})();