
///////////////////showcaseSwiper//////////////////////////////////////
const showcaseSwiper = new Swiper('.land-showcase_swiper', {
	slidesPerView: "auto", // показує стільки, скільки влазить
	spaceBetween: 36,
	loop: true, // ✅ клонування для безшовності
	autoplay: {
		delay: 0, // ✅ без затримки
		disableOnInteraction: false, // щоб не зупинявся при наведенні/кліку
	},
	speed: 3000, // ✅ чим більше значення, тим повільніше рух (наприклад, 6000-10000)
	freeMode: true, // ✅ для "біжучої стрічки"
	freeModeMomentum: false, // без інерції — рівномірний рух
	slidesOffsetBefore: 0,
	slidesOffsetAfter: (window.innerWidth - 1200) / 2,
	pagination: {
		el: '.swiper-pagination',
		clickable: true,
	},
	on: {
		init(swiper) {
			const bullets = swiper.pagination.bullets;
			const activeBullet = bullets[swiper.realIndex];
			const parent = document.querySelector('.swiper-pagination');
			if (activeBullet && parent) {
				parent.style.setProperty('--bullet-left', activeBullet.offsetLeft + 'px');
				parent.style.setProperty('--bullet-width', '12px');
			}
		},
		slideChange(swiper) {
			const bullets = swiper.pagination.bullets;
			const activeIndex = swiper.realIndex;
			const prevIndex = swiper.previousIndex % bullets.length;
			const parent = document.querySelector('.swiper-pagination');

			if (!parent || !bullets[activeIndex] || !bullets[prevIndex]) return;

			const current = bullets[activeIndex];
			const previous = bullets[prevIndex];

			const currentLeft = current.offsetLeft;
			const prevLeft = previous.offsetLeft;

			const minLeft = Math.min(currentLeft, prevLeft);
			const maxLeft = Math.max(currentLeft, prevLeft);

			parent.style.setProperty('--bullet-left', minLeft + 'px');
			parent.style.setProperty('--bullet-width', (maxLeft - minLeft + 12) + 'px');

			setTimeout(() => {
				parent.style.setProperty('--bullet-left', currentLeft + 'px');
				parent.style.setProperty('--bullet-width', '12px');
			}, 350);
		}
	}
});



///showcase_swiper_bottom///
const showcaseSwiperBottom = new Swiper('.land-showcase_swiper_bottom', {
	slidesPerView: "auto",
	spaceBetween: 90,
	freeMode: true,
	loop: true,

	slidesOffsetBefore: 0,
	slidesOffsetAfter: 0,

	autoplay: {
		delay: 0,
		disableOnInteraction: true,
	},

	speed: 2000,
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
			const step = parseInt(btn.getAttribute("data-step"), 10);
			if (images[step]) {
				images[step].classList.add("active");
			}
		});
	});
});


//////////swiper_3х//////////////////
function initCustomSwiper(selector) {
	return new Swiper(selector, {
		slidesPerView: "auto",
		spaceBetween: 24,
		loop: true,
		autoplay: {
			delay: 0,
			disableOnInteraction: true,
		},
		speed: 3000,
		slidesOffsetBefore: 0,
		slidesOffsetAfter: (window.innerWidth - 1200) / 2,
		pagination: {
			el: selector + ' .swiper-pagination',
			clickable: true,
		},
		on: {
			slideChange(swiper) {
				const bullets = swiper.pagination.bullets;
				const activeIndex = swiper.realIndex;
				const prevIndex = swiper.previousIndex;
				const parent = document.querySelector(selector + ' .swiper-pagination');

				if (!parent || !bullets[activeIndex] || !bullets[prevIndex]) return;

				const current = bullets[activeIndex];
				const previous = bullets[prevIndex];

				const currentLeft = current.offsetLeft;
				const prevLeft = previous.offsetLeft;

				const minLeft = Math.min(currentLeft, prevLeft);
				const maxLeft = Math.max(currentLeft, prevLeft);

				parent.style.setProperty('--bullet-left', minLeft + 'px');
				parent.style.setProperty('--bullet-width', (maxLeft - minLeft + 12) + 'px');

				setTimeout(() => {
					parent.style.setProperty('--bullet-left', currentLeft + 'px');
					parent.style.setProperty('--bullet-width', '12px');
				}, 350);
			},
			init(swiper) {
				const bullets = swiper.pagination.bullets;
				const activeBullet = bullets[swiper.realIndex];
				const parent = document.querySelector(selector + ' .swiper-pagination');
				if (activeBullet && parent) {
					parent.style.setProperty('--bullet-left', activeBullet.offsetLeft + 'px');
					parent.style.setProperty('--bullet-width', '12px');
				}
			}
		}
	});
}

const readySlider = initCustomSwiper('.land-ready_slider_wrapper');
const howDoSlider = initCustomSwiper('.land-how_do_swiper');
const feedbackSlider = initCustomSwiper('.land-feedback_swiper');


///animate////
AOS.init({
	duration: 1200,
	easing: 'ease-out-cubic',
	offset: 150,
	delay: 0,
	once: false,
	mirror: true,
	anchorPlacement: 'center-bottom'
});



