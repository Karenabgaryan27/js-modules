// const PageFade = (function () {
//     const transitionDuration = 100;
//     let overlay = null;
//     // const animations = [
//     //     "fade-right",
//     //     "fade-left",
//     //     "fade-up",
//     //     "fade-down",
//     //     "rotate-up",
//     //     "rotate-down",
//     //     "fade-up-right",
//     //     "fade-down-left",
//     //     "fade",
//     // ];

//     // const getRandomAnimation = () => {
//     //     const random = Math.floor(Math.random() * animations.length);
//     //     return animations[random];
//     // };

//     const createOverlay = () => {
//         overlay = document.createElement("div");
//         overlay.className = `overlay show`;
//         overlay.setAttribute("data-animation", 'fade');
//         document.body.appendChild(overlay);
//         setTimeout(() => document.body.style.display = "block", 0 );
//         // setTimeout(() => hideOverlay(), transitionDuration );
//         window.addEventListener('load',hideOverlay,{once:true})
//     };

//     const showOverlay = (anchor) => {
//         if (overlay.classList.contains("fading")) return;

//         const href = new URL(anchor.href);
//         overlay.addEventListener("transitionend", () => location.assign(href), { once: true });
//         overlay.className = "overlay show fading";
//     };

//     const hideOverlay = () => {
//         overlay.addEventListener(
//             "transitionend",
//             () => {
//                 overlay.className = "overlay";
//                 // overlay.setAttribute("data-animation", getRandomAnimation());
//             },
//             { once: true }
//         );
//         overlay.className = "overlay fading";
//     };

//     document.addEventListener("click", (e) => {
//         const anchor = e.target.closest("a");
//         if (!anchor) return;
//         const target = anchor.getAttribute("target")
//         if (!anchor.href || anchor.href && anchor.href.includes('#') || target && target === '_blank') return;
//         e.preventDefault();
//         showOverlay(anchor);
//     });

//     createOverlay();

//     return { showOverlay, hideOverlay };
// })();
