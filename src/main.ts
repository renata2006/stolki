import { initMenu } from "./main_navigation";
import { Modal } from "./modal";

initMenu();

const modalOutlet: HTMLElement = document.querySelector(".modal-container");

const galleries = document.querySelectorAll(".lightgallery");
galleries.forEach((gallery) => {
  const images: HTMLElement[] = Array.from(gallery.children).map(
    (gal) => gal.firstElementChild.lastElementChild as HTMLElement
  );

  images.forEach((image, index) => {
    const modal = new Modal(modalOutlet);
    image.addEventListener("click", () => {
      modal.showModal(images, image, index);
    });
  });
});
