//////////////////// showcase ////////////////////
const showcaseFilter = document.querySelector('.land-showcase_filter');
const filterBtns = showcaseFilter.querySelectorAll('.land-filter-btn');
const showcaseWrapper = document.querySelector('.land-showcase_swiper .swiper-wrapper');
const preloader = document.querySelector('.land-preloader');
let showcaseSwiper;
const allSlides = Array.from(document.querySelectorAll('.land-showcase_slide'));
function initSwiper() {
  if (showcaseSwiper) showcaseSwiper.destroy(true, true);
  showcaseSwiper = new Swiper('.land-showcase_swiper', {
    slidesPerView: "auto",
    spaceBetween: 36,
    loop: true,
    watchOverflow: true,
    loopedSlides: allSlides.length,
    autoplay: {
      delay: 0,
      disableOnInteraction: false
    },
    speed: 3000,
    freeMode: false,
    slidesOffsetBefore: 0,
    slidesOffsetAfter: (window.innerWidth - 1200) / 2,
    pagination: {
      el: '.land-showcase_swiper .swiper-pagination',
      clickable: true
    },
    breakpoints: {
      0: {
        spaceBetween: 15,
        slidesOffsetBefore: 20,
        slidesOffsetAfter: 20
      },
      1200: {
        spaceBetween: 36,
        slidesOffsetBefore: 0,
        slidesOffsetAfter: (window.innerWidth - 1200) / 2
      }
    },
    on: {
      init(swiper) {
        const bullets = swiper.pagination.bullets;
        const activeBullet = bullets[swiper.realIndex];
        const parent = document.querySelector('.land-showcase_swiper .swiper-pagination');
        if (activeBullet && parent) {
          parent.style.setProperty('--bullet-left', activeBullet.offsetLeft + 'px');
          parent.style.setProperty('--bullet-width', '6px');
        }
        swiper.el.addEventListener('mouseenter', () => swiper.autoplay.stop());
        swiper.el.addEventListener('mouseleave', () => swiper.autoplay.start());
      },
      slideChange(swiper) {
        const bullets = swiper.pagination.bullets;
        const activeIndex = swiper.realIndex;
        const prevIndex = swiper.previousRealIndex;
        const parent = document.querySelector('.land-showcase_swiper .swiper-pagination');
        if (!parent || !bullets[activeIndex] || !bullets[prevIndex]) return;
        const current = bullets[activeIndex];
        const previous = bullets[prevIndex];
        const minLeft = Math.min(current.offsetLeft, previous.offsetLeft);
        const maxLeft = Math.max(current.offsetLeft, previous.offsetLeft);
        parent.style.setProperty('--bullet-left', minLeft + 'px');
        parent.style.setProperty('--bullet-width', maxLeft - minLeft + 6 + 'px');
        setTimeout(() => {
          parent.style.setProperty('--bullet-left', current.offsetLeft + 'px');
          parent.style.setProperty('--bullet-width', '6px');
        }, 350);
      }
    }
  });
}
function filterSlides(category) {
  preloader.classList.add('active');
  setTimeout(() => {
    showcaseWrapper.innerHTML = "";
    allSlides.forEach(slide => {
      if (category === "all" || slide.dataset.category === category) {
        showcaseWrapper.appendChild(slide);
      }
    });
    initSwiper();
    setTimeout(() => preloader.classList.remove('active'), 300);
  }, 500);
}
initSwiper();
filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const filter = btn.dataset.filter || 'all';
    filterSlides(filter);
  });
});

///showcase_swiper_bottom///
const showcaseSwiperBottom = new Swiper('.land-showcase_swiper_bottom', {
  slidesPerView: "auto",
  spaceBetween: 90,
  freeMode: true,
  loop: true,
  watchOverflow: true,
  speed: 3000,
  freeModeMomentum: false,
  slidesOffsetBefore: 0,
  slidesOffsetAfter: 0,
  autoplay: {
    delay: 0,
    disableOnInteraction: true
  },
  breakpoints: {
    0: {
      spaceBetween: 36,
      slidesOffsetBefore: 20,
      slidesOffsetAfter: 20
    },
    1200: {
      spaceBetween: 90,
      slidesOffsetBefore: 0,
      slidesOffsetAfter: 0
    }
  },
  on: {
    init(swiper) {
      swiper.el.addEventListener('mouseenter', () => {
        swiper.autoplay.stop();
      });
      swiper.el.addEventListener('mouseleave', () => {
        swiper.autoplay.start();
      });
    }
  }
});

////////////////////work_info///////////////////////
document.addEventListener("DOMContentLoaded", () => {
  const buttons = document.querySelectorAll(".land-info_work__desc button");
  const images = document.querySelectorAll(".land-info_work__img img");
  buttons.forEach(btn => {
    btn.addEventListener("mouseenter", () => {
      buttons.forEach(b => b.classList.remove("active"));
      images.forEach(img => img.classList.remove("active"));
      btn.classList.add("active");
      const step = btn.dataset.step;
      const imgToShow = document.querySelector(`.land-info_work__img img[data-step="${step}"]`);
      if (imgToShow) {
        imgToShow.classList.add("active");
      }
    });
  });
});

//////////swiper_3х//////////////////
function initCustomSwiper(selector, options = {}) {
  const allSlides = document.querySelectorAll(selector + ' .swiper-slide');
  const swiper = new Swiper(selector, {
    slidesPerView: "auto",
    spaceBetween: 24,
    loop: true,
    loopedSlides: allSlides.length,
    autoplay: {
      delay: 0,
      disableOnInteraction: true
    },
    speed: 3000,
    slidesOffsetBefore: 0,
    slidesOffsetAfter: (window.innerWidth - 1200) / 2,
    pagination: {
      el: selector + ' .swiper-pagination',
      clickable: true
    },
    ...options,
    on: {
      slideChange(swiper) {
        const bullets = swiper.pagination.bullets;
        const activeIndex = swiper.realIndex;
        const prevIndex = swiper.previousRealIndex;
        const parent = document.querySelector(selector + ' .swiper-pagination');
        if (!parent || !bullets[activeIndex] || !bullets[prevIndex]) return;
        const current = bullets[activeIndex];
        const previous = bullets[prevIndex];
        const currentLeft = current.offsetLeft;
        const prevLeft = previous.offsetLeft;
        const minLeft = Math.min(currentLeft, prevLeft);
        const maxLeft = Math.max(currentLeft, prevLeft);
        parent.style.setProperty('--bullet-left', minLeft + 'px');
        parent.style.setProperty('--bullet-width', maxLeft - minLeft + 6 + 'px');
        setTimeout(() => {
          parent.style.setProperty('--bullet-left', currentLeft + 'px');
          parent.style.setProperty('--bullet-width', '6px');
        }, 350);
      },
      init(swiper) {
        const bullets = swiper.pagination.bullets;
        const activeBullet = bullets[swiper.realIndex];
        const parent = document.querySelector(selector + ' .swiper-pagination');
        if (activeBullet && parent) {
          parent.style.setProperty('--bullet-left', activeBullet.offsetLeft + 'px');
          parent.style.setProperty('--bullet-width', '6px');
        }
        swiper.el.addEventListener('mouseenter', () => {
          swiper.autoplay.stop();
        });
        swiper.el.addEventListener('mouseleave', () => {
          swiper.autoplay.start();
        });
      }
    }
  });
  return swiper;
}
const readySlider = initCustomSwiper('.land-ready_slider_wrapper', {
  spaceBetween: 24,
  breakpoints: {
    0: {
      slidesOffsetBefore: 20,
      slidesOffsetAfter: 20
    },
    1200: {
      slidesOffsetBefore: 0,
      slidesOffsetAfter: (window.innerWidth - 1200) / 2
    }
  }
});
const feedbackSlider = initCustomSwiper('.land-feedback_swiper', {
  spaceBetween: 38,
  breakpoints: {
    0: {
      slidesOffsetBefore: 20,
      slidesOffsetAfter: 20
    },
    1200: {
      slidesOffsetBefore: 0,
      slidesOffsetAfter: (window.innerWidth - 1200) / 2
    }
  }
});

///animate////
AOS.init({
  duration: 1200,
  easing: 'ease-out-cubic',
  offset: 150,
  delay: 0,
  once: true,
  mirror: false,
  anchorPlacement: 'center-bottom'
});

//////////////////// how_do ////////////////////
const howDoFilter = document.querySelector('.how_do__filters');
const howDoBtns = howDoFilter.querySelectorAll('.land-how_do-btn');
const howDoWrapper = document.querySelector('.land-how_do_swiper .swiper-wrapper');
const howDoPreloader = document.querySelector('.land-how_do-preloader');
let howDoSwiper;
const allHowDoSlides = Array.from(document.querySelectorAll('.land-how_do_swiper__item'));
function initHowDoSwiper() {
  if (howDoSwiper) howDoSwiper.destroy(true, true);
  howDoSwiper = new Swiper('.land-how_do_swiper', {
    slidesPerView: "auto",
    spaceBetween: 24,
    loop: true,
    loopedSlides: allHowDoSlides.length,
    autoplay: {
      delay: 0,
      disableOnInteraction: false
    },
    speed: 3000,
    freeMode: true,
    freeModeMomentum: false,
    slidesOffsetBefore: 0,
    slidesOffsetAfter: (window.innerWidth - 1200) / 2,
    pagination: {
      el: '.land-how_do_swiper .swiper-pagination',
      clickable: true
    },
    breakpoints: {
      0: {
        slidesOffsetBefore: 20,
        slidesOffsetAfter: 20
      },
      1200: {
        slidesOffsetBefore: 0,
        slidesOffsetAfter: (window.innerWidth - 1200) / 2
      }
    },
    on: {
      init(swiper) {
        const bullets = swiper.pagination.bullets;
        const activeBullet = bullets[swiper.realIndex];
        const parent = document.querySelector('.land-how_do_swiper .swiper-pagination');
        if (activeBullet && parent) {
          parent.style.setProperty('--bullet-left', activeBullet.offsetLeft + 'px');
          parent.style.setProperty('--bullet-width', '6px');
        }
        swiper.el.addEventListener('mouseenter', () => swiper.autoplay.stop());
        swiper.el.addEventListener('mouseleave', () => swiper.autoplay.start());
      },
      slideChange(swiper) {
        const bullets = swiper.pagination.bullets;
        const activeIndex = swiper.realIndex;
        const prevIndex = swiper.previousRealIndex;
        const parent = document.querySelector('.land-how_do_swiper .swiper-pagination');
        if (!parent || !bullets[activeIndex] || !bullets[prevIndex]) return;
        const current = bullets[activeIndex];
        const previous = bullets[prevIndex];
        const minLeft = Math.min(current.offsetLeft, previous.offsetLeft);
        const maxLeft = Math.max(current.offsetLeft, previous.offsetLeft);
        parent.style.setProperty('--bullet-left', minLeft + 'px');
        parent.style.setProperty('--bullet-width', maxLeft - minLeft + 6 + 'px');
        setTimeout(() => {
          parent.style.setProperty('--bullet-left', current.offsetLeft + 'px');
          parent.style.setProperty('--bullet-width', '6px');
        }, 350);
      }
    }
  });
}
function filterHowDoSlides(category) {
  howDoPreloader.classList.add('active');
  setTimeout(() => {
    howDoWrapper.innerHTML = "";
    allHowDoSlides.forEach(slide => {
      if (category === "all" || slide.dataset.category === category) {
        howDoWrapper.appendChild(slide);
      }
    });
    initHowDoSwiper();
    setTimeout(() => howDoPreloader.classList.remove('active'), 300);
  }, 500);
}
initHowDoSwiper();
howDoBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    howDoBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const filter = btn.dataset.filter || 'all';
    filterHowDoSlides(filter);
  });
});
//# sourceMappingURL=main.js.map
