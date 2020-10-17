$(document).ready(function() {
    'use stricts';

    const scrollToTop = document.getElementById("scroll-to-top");

    window.onscroll = function () {
      if ($(document).scrollTop() > 200) {
        console.log('show');
        scrollToTop.classList.add("show");
      } else {
        scrollToTop.classList.remove("show");
      }
    };

    scrollToTop.addEventListener("click", function () {
      $("html, body").animate({ scrollTop: 0 }, "slow");
    });

    new Swiper('.swiper-container', {
        pagination: {
          el: '.swiper-pagination',
          type: 'progressbar',
        },
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },
    });
})