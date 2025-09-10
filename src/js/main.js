//////////////////випадашка в хедері ///////////////////////////
document.addEventListener("DOMContentLoaded", () => {
	const dropdown = document.querySelector(".header__dropdown");
	if (!dropdown) return;

	const btn = dropdown.querySelector(".header__dropdown-btn");
	const list = dropdown.querySelector(".header__dropdown-list");
	const btnText = btn.querySelector("span");

	btn.addEventListener("click", () => {
		dropdown.classList.toggle("open");
	});

	list.querySelectorAll("li").forEach(item => {
		item.addEventListener("click", () => {
			btnText.textContent = item.textContent;
			dropdown.classList.remove("open");
			console.log("Вибрано:", item.dataset.value);
		});
	});

	document.addEventListener("click", e => {
		if (!dropdown.contains(e.target)) {
			dropdown.classList.remove("open");
		}
	});
});



/////////////////////////////////////////////////////////
const showcaseSwiper = new Swiper('.showcase_swiper', {
	slidesPerView: "auto",
	spaceBetween: 36,
	loop: false,
	autoplay: {
		delay: 0,              // без паузи
		disableOnInteraction: false, // не зупиняти після взаємодії
	},

	speed: 4000, // швидкість “стрічки” (чим більше, тим повільніше)
	slidesOffsetBefore: 0,
	slidesOffsetAfter: (window.innerWidth - 1200) / 2,
	pagination: {
		el: '.swiper-pagination',
		clickable: true,
	},
	on: {
		slideChange(swiper) {
			const bullets = swiper.pagination.bullets;
			const activeIndex = swiper.realIndex;
			const prevIndex = swiper.previousIndex;
			const parent = document.querySelector('.swiper-pagination');

			if (!parent || !bullets[activeIndex] || !bullets[prevIndex]) return;

			const current = bullets[activeIndex];
			const previous = bullets[prevIndex];

			const currentLeft = current.offsetLeft;
			const prevLeft = previous.offsetLeft;

			// визначаємо відстань між точками
			const minLeft = Math.min(currentLeft, prevLeft);
			const maxLeft = Math.max(currentLeft, prevLeft);

			// розтягуємо "рідкий" індикатор на всю довжину між точками
			parent.style.setProperty('--bullet-left', minLeft + 'px');
			parent.style.setProperty('--bullet-width', (maxLeft - minLeft + 12) + 'px');

			// після анімації стискаємо назад у новій позиції
			setTimeout(() => {
				parent.style.setProperty('--bullet-left', currentLeft + 'px');
				parent.style.setProperty('--bullet-width', '12px');
			}, 350);
		},
		init(swiper) {
			const bullets = swiper.pagination.bullets;
			const activeBullet = bullets[swiper.realIndex];
			const parent = document.querySelector('.swiper-pagination');
			if (activeBullet && parent) {
				parent.style.setProperty('--bullet-left', activeBullet.offsetLeft + 'px');
				parent.style.setProperty('--bullet-width', '12px');
			}
		}
	}
});




///showcase_swiper_bottom///
const showcaseSwiperBottom = new Swiper('.showcase_swiper_bottom', {
	slidesPerView: "auto",
	spaceBetween: 90,
	freeMode: true,
	loop: true, // краще увімкнути, щоб крутився по колу

	slidesOffsetBefore: 0,
	slidesOffsetAfter: 0,

	autoplay: {
		delay: 0,              // без паузи
		disableOnInteraction: false, // не зупиняти після взаємодії
	},

	speed: 4000, // швидкість “стрічки” (чим більше, тим повільніше)
});




