// ページ読み込み時メッセージ表示
document.addEventListener('DOMContentLoaded', function () {
	bootbox.alert({
		message: "大学入学共通テストの受験生は、大学入試センターから指定された（各自の受験票に記載された）試験場で受験してください。",
		title: "注意",
		closeButton: false
	});
});

// ベースマップ表示設定
const map = new maplibregl.Map({
	container: 'map',
	minZoom: 4,
	maxZoom: 14,
	center: [136.08, 35.52],
	zoom: 5,
	hash: true,
	style: {
		version: 8,
		glyphs: "https://demotiles.maplibre.org/font/{fontstack}/{range}.pbf",
		sources: {
			gsi_blank: {
				type: 'raster',
				tiles: [
					'https://cyberjapandata.gsi.go.jp/xyz/blank/{z}/{x}/{y}.png',
				],
				tileSize: 256,
				attribution:
					'Produced by <a href="https://twitter.com/tochirinuru" target="_blank">とちりぬる</a>. Data by <a href="https://www.dnc.ac.jp/" target="_blank">大学入試センター</a>. Map tiles by <a href="https://maps.gsi.go.jp/development/ichiran.html" target="_blank">地理院タイル</a> and <a href="https://www.openstreetmap.org/copyright/ja" target="_blank">OpenStreetMap contributors</a>.',
			},
			gsi_pale: {
				type: 'raster',
				tiles: [
					'https://cyberjapandata.gsi.go.jp/xyz/pale/{z}/{x}/{y}.png',
				],
				tileSize: 256,
			},
			gsi_std: {
				type: 'raster',
				tiles: [
					'https://cyberjapandata.gsi.go.jp/xyz/std/{z}/{x}/{y}.png',
				],
				tileSize: 256,
			},
			gsi_photo: {
				type: 'raster',
				tiles: [
					'https://cyberjapandata.gsi.go.jp/xyz/seamlessphoto/{z}/{x}/{y}.jpg',
				],
				tileSize: 256,
			},
			osm_std: {
				type: 'raster',
				tiles: [
					'https://a.tile.openstreetmap.org/{z}/{x}/{y}.png',
					'https://b.tile.openstreetmap.org/{z}/{x}/{y}.png',
				],
				tileSize: 256,
			},
			ueeh_s: {
				type: 'geojson',
				data: './geofiles/ueeh_s.geojson',
				maxzoom: 14
			},
			ueeh_c: {
				type: 'geojson',
				data: './geofiles/ueeh_c.geojson',
				maxzoom: 14
			}
		},
		layers: [
			{
				id: 'gsi_blank',
				type: 'raster',
				source: 'gsi_blank',
				minzoom: 4,
				maxzoom: 14.1,
			},
			{
				id: 'gsi_pale',
				type: 'raster',
				source: 'gsi_pale',
				minzoom: 4,
				maxzoom: 10.5,
			},
			{
				id: 'gsi_std',
				type: 'raster',
				source: 'gsi_std',
				minzoom: 4,
				maxzoom: 10.5,
				layout: {
					visibility: 'none'
				}
			},
			{
				id: 'gsi_photo',
				type: 'raster',
				source: 'gsi_photo',
				minzoom: 4,
				maxzoom: 10.5,
				layout: {
					visibility: 'none'
				}
			},
			{
				id: 'osm_std',
				type: 'raster',
				source: 'osm_std',
				minzoom: 4,
				maxzoom: 10.5,
				layout: {
					visibility: 'none'
				}
			},
			{
				id: 'ueeh_s',
				type: 'symbol',
				source: 'ueeh_s',
				layout: {
					'text-field': ['get', 'hall_s'],
					'text-anchor': 'left',
					'text-offset': [0.8, 0],
					'text-size': 16,
					'text-max-width': 50,
					'visibility': 'none'
				},
				paint: {
					'text-color': 'rgba(255, 76, 0, 1)',
					'text-halo-color': 'rgba(255, 255, 255, 0.7)',
					'text-halo-width': 3
				}
			},
			{
				id: 'ueeh_c',
				type: 'circle',
				source: 'ueeh_c',
				paint: {
					'circle-color': 'rgba(255, 75, 0, 1)',
					'circle-opacity': 0.9,
					'circle-radius': 8,
					'circle-stroke-color': 'rgba(255, 255, 255, 1)',
					'circle-stroke-opacity': 0.9,
					'circle-stroke-width': 3,
				}
			}
		]
	}
});

// ベースマップ表示切り替え設定
function changeMap(selectedMap) {
	['gsi_pale', 'gsi_std', 'gsi_photo', 'osm_std'].forEach(layer => {
	map.setLayoutProperty(layer, 'visibility', layer === selectedMap ? 'visible' : 'none');
	});
}

map.on('load', function() {

	// ポイントレイヤ（サークル）のマウスクリック時の属性表示動作
	map.on('click', 'ueeh_s', function (e) {

		// 属性設定
		const hall = e.features[0].properties['hall'];
		const univ = e.features[0].properties['univ'];
		const pref = e.features[0].properties['pref'];
		const apm = e.features[0].properties['apm'];
		const adr = e.features[0].properties['d_adr'];

		new maplibregl.Popup()
			.setLngLat(e.lngLat)
			.setHTML(
				'<div class="popup-title">' + hall + '</div>' +
				'<table class="popup-table rounded-rect"><tr class="popup-trow"><th class="popup-tdata sbj">試験実施大学名</th><td class="popup-tdata">' + univ + '</td></tr>' +
				'<tr class="popup-trow"><th class="popup-tdata sbj">都道府県名</th><td class="popup-tdata">' + pref + '</td></tr>' +
				'<tr class="popup-trow"><th class="popup-tdata sbj">所在地</th><td class="popup-tdata">' + adr + '</td></tr>' +
				'<tr class="popup-trow"><th class="popup-tdata sbj">志願者数</th><td class="popup-tdata">' + apm + '名</td></tr></table>'
			)
			.addTo(map);

	});
	// ポイントレイヤ（シンボル）のマウスクリック時の属性表示動作
	map.on('click', 'ueeh_c', function (e) {

		// 属性設定
		const hall = e.features[0].properties['hall'];
		const univ = e.features[0].properties['univ'];
		const pref = e.features[0].properties['pref'];
		const apm = e.features[0].properties['apm'];
		const adr = e.features[0].properties['d_adr'];

		new maplibregl.Popup()
			.setLngLat(e.lngLat)
			.setHTML(
				'<div class="popup-title">' + hall + '</div>' +
				'<table class="popup-table rounded-rect"><tr class="popup-trow"><th class="popup-tdata sbj">試験実施大学名</th><td class="popup-tdata">' + univ + '</td></tr>' +
				'<tr class="popup-trow"><th class="popup-tdata sbj">都道府県名</th><td class="popup-tdata">' + pref + '</td></tr>' +
				'<tr class="popup-trow"><th class="popup-tdata sbj">所在地</th><td class="popup-tdata">' + adr + '</td></tr>' +
				'<tr class="popup-trow"><th class="popup-tdata sbj">志願者数</th><td class="popup-tdata">' + apm + '名</td></tr></table>'
			)
			.addTo(map);
	});
});

// ポイントレイヤ（シンボル）の表示設定
switchlayer = function (lname) {
	if (document.getElementById("cb" + lname).checked) {
		map.setLayoutProperty(lname + '_s', 'visibility', 'visible');
	} else {
		map.setLayoutProperty(lname + '_s', 'visibility', 'none');
	}
};

// フィルタスライダー設定
function filterBy(year) {
	const filter_year = ['==', 'year', year];
	map.setFilter('ueeh_c', filter_year);
	map.setFilter('ueeh_s', filter_year);

	document.getElementById('year_label').textContent = year.toString();
};

// フィルタスライダー初期表示
map.on('load', function () {
	filterBy(2025);
	document.getElementById('slider_year').addEventListener('input', function (e) {
		const year = parseInt(e.target.value, 10);
		filterBy(year);
	});
});

// ズームバー表示
map.addControl(new maplibregl.NavigationControl());

// フルスクリーンボタン表示
map.addControl(new maplibregl.FullscreenControl());

// 現在位置ボタン表示
map.addControl(new maplibregl.GeolocateControl({
	positionOptions: {
		enableHighAccuracy: false
	},
	fitBoundsOptions: {maxZoom: 6},
	trackUserLocation: true,
	showUserLocation: true
}));

// スケールバー表示
map.addControl(new maplibregl.ScaleControl(), 'bottom-right');
