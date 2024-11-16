// Підключення функціоналу "Чертоги Фрілансера"
import { isMobile } from "./functions.js";
// Підключення списку активних модулів
import { flsModules } from "./modules.js";
document.addEventListener('DOMContentLoaded', function () {
	// ================[ JavaScript Scroll Z-Index Image ]================
	const heroImage = document.querySelector('.hero__image');
	function handleScroll() {
		if (window.scrollY >= 10) {
			heroImage.classList.add('disable-z-index');
		} else {
			heroImage.classList.remove('disable-z-index');
		}
	}
	window.addEventListener('scroll', handleScroll);
	// ================[ JavaScript Video Play & Pause ]================
	const videos = document.querySelectorAll('.record__video');
	const buttons = document.querySelectorAll('.record__button');
	if (videos !== null) {
		videos.forEach((video, index) => {
			const videoButton = buttons[index];
			if (video !== null && videoButton !== null) {
				videoButton.addEventListener('click', function () {
					if (video.paused) {
						video.play();
						video.classList.add("video-pointer");
						videoButton.classList.add('play-btn-disable');
					}
				});
				video.addEventListener('click', function () {
					if (!video.paused) {
						video.pause();
						video.classList.remove("video-pointer");
						videoButton.classList.remove('play-btn-disable');
					}
				});
			}
		});
		document.addEventListener("popupClosed", function () {
			videos.forEach((video) => {
				if (!video.paused) {
					video.pause();
					video.classList.remove("video-pointer");
					buttons.forEach((button) => button.classList.remove('play-btn-disable'));
				}
			});
		});
	}
	// ================[ JavaScript Tabs Animation ]================
	const tabTitles = document.querySelectorAll('.tabs__title');
	const tabNavigation = document.querySelector('.tabs__navigation');
	if (tabTitles !== null) {
		tabTitles.forEach(title => {
			title.addEventListener('click', () => {
				// Если кликнули по активному табу (с классом title-active), то ничего не делаем
				if (title.classList.contains('title-active')) {
					return;
				}

				// Убираем класс title-active с текущего активного таба
				const activeTab = document.querySelector('.tabs__title.title-active');
				if (activeTab) {
					activeTab.classList.remove('title-active');
				}

				// Добавляем класс title-active к выбранному табу
				title.classList.add('title-active');

				// Добавляем или убираем класс nav-toggle у navigation
				if (tabNavigation.classList.contains('nav-toggle')) {
					tabNavigation.classList.remove('nav-toggle');
				} else {
					tabNavigation.classList.add('nav-toggle');
				}
			});
		});
	}
	// ================[ JavaScript Show More ]================
	const reviewsButton = document.querySelector('.reviews__button');
	if (reviewsButton !== null) {
		reviewsButton.addEventListener('click', function () {
			// Находим все колонки с отзывами
			const columns = document.querySelectorAll('.reviews__item');

			columns.forEach(column => {
				const reviews = column.querySelectorAll('.review-item-sm');

				// Фильтруем все элементы, у которых нет класса 'visible'
				const hiddenReviews = Array.from(reviews).filter(review => !review.classList.contains('visible'));

				// Добавляем класс 'visible' к следующим двум скрытым элементам
				for (let i = 0; i < 2; i++) {
					if (hiddenReviews[i]) {
						hiddenReviews[i].classList.add('visible');
					}
				}

				// Если скрытых отзывов меньше двух, скрываем кнопку
				if (hiddenReviews.length <= 2) {
					this.style.display = 'none';
				}
			});
		});
	}
});