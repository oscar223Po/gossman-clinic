import { Loader } from '@googlemaps/js-api-loader';
import { MAP_STYLES, BREAKPOINTS } from '../utils/constants.js';

// npm i @googlemaps/js-api-loader

(() => {
	/*
		Структура в HTML:
		<section class="js-map-section">
			...
			<div class="js-map-marker" data-lat="-36.84716497397779" data-lng="174.7686136240803" data-icon="img/marker.svg"></div>
			<div class="js-map-marker" data-lat="-41.28723420666731" data-lng="174.77661452780407" data-icon="img/marker.svg"></div>
			<div class="js-map" data-zoom="16" data-lat="-36.84716497397779" data-lng="174.7686136240803"></div>
			...
		</section>
	*/

	const SELECTORS = {
		section: '.js-map-section',
		marker: '.js-map-marker',
		map: '.js-map',
	};

	const $sections = document.querySelectorAll(SELECTORS.section);

	if (!$sections.length) return;

	const loadMap = async (onLoad) => {
		const loader = new Loader({
			apiKey: 'YOUR_API_KEY',
			version: 'weekly',
			libraries: ['places'],
		});

		try {
			const { Map } = await loader.importLibrary('maps');
			const { Marker } = await loader.importLibrary('marker');
			const Core = await loader.importLibrary('core');

			onLoad({ Map, Marker, Core });
		} catch (e) {
			console.log('google map error');
			console.log(e);
		}
	};

	const initMap = ({ api, lng, lat, markersData, zoom, maxZoom, $map }) => {
		const mapOptions = {
			maxZoom,
			zoom,
			mapTypeControl: false,
			styles: MAP_STYLES,
			center: {
				lat,
				lng,
			},
			disableDefaultUI: true,
		};

		const map = new api.Map($map, mapOptions);

		const markerDesktopSize = { width: 40, height: 57 };
		const markerMobileSize = { width: 30, height: 42 };
		// Розмір маркерів
		const markerSize = window.innerWidth < BREAKPOINTS.tablet ? markerMobileSize : markerDesktopSize;

		const markers = markersData.map(({ lat, lng, icon }) => {
			const marker = new api.marker.AdvancedMarkerElement({
				map,
				position: new api.Core.LatLng(lat, lng),
				icon: {
					url: icon,
					anchor: new api.Core.Point(markerSize.width / 2, markerSize.height),
					scaledSize: new api.Core.Size(markerSize.width, markerSize.height),
				},
			});

			api.Core.event.addListener(marker, 'click', () => {
				markers.forEach((m) =>
					m.setIcon({
						url: m.icon.url,
						anchor: new api.Core.Point(markerSize.width / 2, markerSize.height),
						scaledSize: new api.Core.Size(markerSize.width, markerSize.height),
					}),
				);

				marker.setIcon({
					url: marker.icon.url,
					anchor: new api.Core.Point(markerSize.width / 2, markerSize.height),
					scaledSize: new api.Core.Size(markerSize.width, markerSize.height),
				});

				map.panTo(marker.getPosition());
			});

			return marker;
		});

		return map;
	};

	loadMap((api) => {
		$sections.forEach(($section) => {
			const $maps = $section.querySelectorAll(SELECTORS.map);
			if (!$maps.length) return;

			$maps.forEach(($map) => {
				const $markers = $map.parentElement.querySelectorAll(SELECTORS.marker);

				const markersData = Array.from($markers).map(($marker) => ({
					lng: parseFloat($marker.dataset.lng) || 0,
					lat: parseFloat($marker.dataset.lat) || 0,
					icon: $marker.dataset.icon,
				}));

				const map = initMap({
					api,
					$map,
					lng: parseFloat($map.dataset.lng) || 0,
					lat: parseFloat($map.dataset.lat) || 0,
					zoom: parseFloat($map.dataset.zoom) || 6,
					maxZoom: parseFloat($map.dataset.maxZoom) || 18,
					markersData,
				});
			});
		});
	});
})();
