 - lightbox.js script should be after swiper CDN script

 - add the lock.js script before lightbox.js script to remove/add scroll

  - each time when new lightbox instance have created (newLightboxInstance = new Swiper()) make sure to add it as window object as well (window.newLightboxInstance = newLightboxInstance) so lightbox.js script work correctly