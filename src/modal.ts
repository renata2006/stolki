export class Modal {
  nav: HTMLElement = document.querySelector(".main-navigation");
  content: HTMLElement;
  close: HTMLElement;
  download: HTMLElement;
  span: HTMLElement;
  rightArrow: HTMLElement;
  leftArrow: HTMLElement;
  clone: HTMLElement;
  shareLink: HTMLElement;

  images: HTMLElement[];
  showIndex = 0;

  constructor(private modalOutlet: HTMLElement) {}

  showModal(arr: HTMLElement[], image: HTMLElement, index: number) {
    this.images = arr;
    this.showIndex = index;

    this.modalOutlet.innerHTML = this.markup();
    this.nav.style.display = "none";

    this.setElements();
    this.setShareImageLink(image);

    this.clone = image.cloneNode(true) as HTMLElement;
    this.content.appendChild(this.clone);

    this.updateText();
    this.addDownloadLink(image);
    this.addListeners();
  }

  private setElements() {
    this.content = this.modalOutlet.querySelector(".modal-content");
    this.close = this.modalOutlet.querySelector(".close");
    this.download = this.modalOutlet.querySelector(".download > a");
    this.span = this.modalOutlet.querySelector("span");
    this.rightArrow = this.modalOutlet.querySelector(".right");
    this.leftArrow = this.modalOutlet.querySelector(".left");
  }

  private addListeners() {
    this.close.addEventListener("click", this.closeModal.bind(this));
    this.rightArrow.addEventListener("click", this.nextImage.bind(this));
    this.leftArrow.addEventListener("click", this.prevImage.bind(this));
  }

  private nextImage() {
    this.showImage(+1);
    this.updateText();
  }

  private prevImage() {
    this.showImage(-1);
    this.updateText();
  }

  private showImage(val) {
    this.content.removeChild(this.clone);
    this.setIndex(val);
    this.clone = this.images[this.showIndex].cloneNode(true) as HTMLElement;
    this.download.setAttribute("href", this.addLink(this.clone));
    this.content.appendChild(this.clone);
  }

  private setIndex(val) {
    this.showIndex += val;

    if (this.showIndex === -1) {
      this.showIndex = this.images.length - 1;
    }
    if (this.showIndex === this.images.length) {
      this.showIndex = 0;
    }
  }

  private addDownloadLink(image: HTMLElement) {
    this.download.setAttribute("href", this.addLink(image));
  }

  private updateText() {
    this.span.innerHTML = `${this.showIndex + 1} / ${this.images.length}`;
  }

  private closeModal() {
    this.modalOutlet.innerHTML = "";
    this.nav.style.display = "block";
  }

  private addLink(image: HTMLElement) {
    return image.getAttribute("data-src");
  }

  private setShareImageLink(image: HTMLElement) {
    this.shareLink = this.modalOutlet.querySelector("share-buttons");
    this.shareLink.setAttribute("img-src", this.addLink(image));
  }

  private markup() {
    return `<div class="modal">
      <div class="modal-toolbar">
        <span class="text">4/4</span>
        <div class="icons">
          <share-buttons></share-buttons>  
          <button class="download">
            <a download href="">
              <i class="fas fa-chevron-down fa-2x icon"></i>
            </a>
          </button>
          <button class="close">
            <i class="fas fa-times fa-2x icon"></i>
          </button>
        </div>
      </div>

      <div class="modal-content">
        <button class="arrow left">
          <i class="fas fa-arrow-left fa-2x icon"></i>
        </button>
        <button class="arrow right">
          <i class="fas fa-arrow-right fa-2x icon"></i>
        </button>
      </div>
    </div>`;
  }
}
