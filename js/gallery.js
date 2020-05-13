const modal = document.querySelector(".modal");
const span = modal.querySelector("span");
const content = modal.querySelector(".modal-content");
const nav = document.querySelector(".main-navigation");
const download = document.querySelector(".download > a");
let showIndex = 0;
let clone;
let images;

function showModal(arr, image, index) {
  images = arr;
  showIndex = index;
  modal.style.display = "block";
  clone = image.cloneNode(true);
  content.appendChild(clone);
  updateText();
  nav.style.display = "none";
  download.setAttribute("href", addLink(image));
}
function closeModal() {
  content.removeChild(clone);
  modal.style.display = "none";
  nav.style.display = "block";
}

function nextImage() {
  showImage(+1);
  updateText();
}

function prevImage() {
  showImage(-1);
  updateText();
}

function showImage(val) {
  content.removeChild(clone);
  setIndex(val);
  clone = images[showIndex].cloneNode(true);
  content.appendChild(clone);
}

function setIndex(val) {
  showIndex += val;

  if (showIndex === -1) {
    showIndex = images.length - 1;
  }
  if (showIndex === images.length) {
    showIndex = 0;
  }
}

function updateText() {
  span.innerHTML = `${showIndex + 1} / ${images.length}`;
}

function addLink(image) {
  return image.getAttribute("src");
}
