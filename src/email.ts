import { init, sendForm } from "emailjs-com";
init("user_R1UO7zkQn9IkFmSpudSnW");

const myForm = document.querySelector("form");
const button = document.querySelector(".email-send");

export function initEmail() {
  button.addEventListener("click", () => {
    sendForm("service_1rsve0j", "template_m0rgnrs", myForm).then(
      function (response) {
        console.log("SUCCESS!", response.status, response.text);
      },
      function (error) {
        console.log("FAILED...", error);
      }
    );
  });
}
