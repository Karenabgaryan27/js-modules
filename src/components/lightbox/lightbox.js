// (function () {
//     function Lightbox() {
//         this.reset();
//     }

//     Lightbox.prototype = {
//         constructor: Lightbox,
//         reset() {
//             this.lightbox = null;
//             this.items = [];
//             this.cover = null;
//             this.videoCover = null;
//             this.index = 0;
//             this.indicator = 0;
//             this.content = null;
//             this.timeout = null;
//             this.reassignedHandleKeydown = null;
//         },
//         showLightbox(toggle) {
//             this.lightbox = document.querySelector(toggle.dataset.target);
//             this.lightbox.style.display = "block";
//             this.handleLock(true);
//             setTimeout(() => {
//                 this.lightbox.classList.add("show");
//                 this.content = this.lightbox.querySelector(".lightbox-content");
//                 this.cover = this.lightbox.querySelector(".cover");
//                 this.videoCover = this.lightbox.querySelector(".video-cover");
//                 this.items = document.querySelectorAll(".gallery .item");
//                 this.index = parseFloat(toggle.dataset.index);
//                 this.setActiveItem();
//                 this.reassignedHandleKeydown = (e) => this.handleKeydown(e);
//                 document.addEventListener("keydown", this.reassignedHandleKeydown);
//             }, 100);
//         },
//         hideLightbox() {
//             this.lightbox.classList.remove("show");
//             this.lightbox.addEventListener(
//                 "transitionend",
//                 (e) => {
//                     e.currentTarget.style.display = "none";
//                     this.videoCover.src = "";
//                     this.handleLock();
//                     document.removeEventListener("keydown", this.reassignedHandleKeydown);
//                     this.reset();
//                 },
//                 { once: true }
//             );
//         },
//         handleClick(int) {
//             this.indicator = int;
//             this.content.classList.remove("show");
//             const contentTransitionInCSS = 300;
//             // clearTimeout(this.timeout)
//             this.timeout = setTimeout(() => {
//                 this.setActiveIndex(int);
//                 this.setActiveItem();
//             }, contentTransitionInCSS);
//         },
//         setActiveItem() {
//             this.content.classList.add("show");
//             const src = this.items[this.index].src;
//             const videoSrc = this.items[this.index].dataset.videoSrc;
//             // const videoImageSrc = this.items[this.index].dataset.videoImageSrc
//             if (videoSrc) {
//                 this.videoCover.src = videoSrc;
//                 this.cover.src = "";
//                 this.videoCover.style.display = "block";
//             } else {
//                 this.cover.src = src;
//                 this.videoCover.src = "";
//                 this.videoCover.style.display = "none";
//             }
//         },
//         setActiveIndex(int) {
//             this.index += int;
//             if (this.index > this.items.length - 1) {
//                 this.index = 0;
//             } else if (this.index < 0) {
//                 this.index = this.items.length - 1;
//             }
//         },
//         handleLock(removeScroll) {
//             const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth + "px";
//             const navbar = document.querySelector(".navbar");

//             document.body.style.paddingRight = removeScroll ? scrollbarWidth : "";
//             document.body.style.overflow = removeScroll ? "hidden" : "";
//             if (navbar) navbar.style.borderRight = removeScroll ? `${scrollbarWidth} solid transparent` : "";
//         },
//         // KEYDOWN
//         handleKeydown(e) {
//             // if (!document.querySelector(".lightbox.show")) return;
//             switch (e.key) {
//                 case "ArrowLeft":
//                     this.handleClick(-1);
//                     break;
//                 case "ArrowRight":
//                     this.handleClick(+1);
//                     break;
//                 case "Escape":
//                     this.hideLightbox();
//                     break;
//             }
//         },
//         setEvents() {
//             const preventers = document.querySelectorAll('[data-dismiss="prevent-bubbling"]');
//             if (preventers) preventers.forEach((item) => (item.ontransitionend = (e) => e.stopPropagation()));
//             document.addEventListener("click", (e) => {
//                 const toggle = e.target.closest("[data-toggle='lightbox']"),
//                     content = e.target.closest(".lightbox-content"),
//                     closestLightbox = e.target.closest(".lightbox"),
//                     prevAngle = e.target.closest("[data-toggle='prev-lightbox']"),
//                     nextAngle = e.target.closest("[data-toggle='next-lightbox']");
//                 if (toggle) this.showLightbox(toggle);
//                 if (prevAngle) this.handleClick(-1);
//                 if (nextAngle) this.handleClick(+1);
//                 if (closestLightbox && !content && !prevAngle && !nextAngle) this.hideLightbox();
//             });
//         },
//     };

//     const lightboxState = {};

//     const lightbox = new Lightbox(lightboxState);
//     lightbox.setEvents();
// })();
