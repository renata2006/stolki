import { init, sendForm } from "emailjs-com";
init("user_R1UO7zkQn9IkFmSpudSnW");

const myForm = document.querySelector("form");
const button = document.querySelector(".email-send");
const loader = document.querySelector(".loader");

declare var grecaptcha: any;

export function initEmail() {
  button.addEventListener("click", (e) => {
    myForm.style.display = "none";
    (loader as any).style.display = "block";

    e.preventDefault();
    grecaptcha.ready(function () {
      grecaptcha
        .execute("6LcNAbEdAAAAABpkFzI6QqnacoTQpqTUbY-i-lUF", {
          action: "submit",
        })
        .then(function (token) {
          var input = document.createElement("input");
          input.setAttribute("type", "hidden");
          input.setAttribute("name", "g-recaptcha-response");
          input.setAttribute("value", token);
          myForm.append(input);
          // Add your logic to submit to your backend server here.

          sendForm("service_1rsve0j", "template_m0rgnrs", myForm).then(
            function (response) {
              console.log("SUCCESS!", response.status, response.text);
            },
            function (error) {
              console.log("FAILED...", error);
            }
          );
        });
    });
  });
}
