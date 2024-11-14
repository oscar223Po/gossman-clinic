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
});