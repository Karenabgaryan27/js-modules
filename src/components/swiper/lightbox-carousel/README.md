 - lightbox-carousel.js script should be after swiper CDN script

 - add the lock.js script before lightbox-carousel.js script to remove/add scroll

  - each time when new lightbox-carousel instance have created (newLightboxCarouselInstance = new Swiper()) make sure to add it as window object as well (window.newLightboxCarouselInstance = newLightboxCarouselInstance) so lightbox.js script work correctly