class ShareButtons extends HTMLElement {
  imgSrc: string;

  constructor() {
    super();
  }

  connectedCallback() {
    this.innerHTML = `
        <button class="share">
            <i class="fab fa-facebook-square fa-2x icon"></i>
        </button>
        `;

    this.querySelector(".share").addEventListener("click", () => {
      this.imgSrc = this.getAttribute("img-src");
      const u = "http://stolkidrewniane.pl/" + this.imgSrc;
      window.open(
        "http://www.facebook.com/sharer.php?u=" + encodeURIComponent(u),
        "sharer",
        "toolbar=0,status=0,width=626,height=436"
      );
    });
  }
}

customElements.define("share-buttons", ShareButtons);
