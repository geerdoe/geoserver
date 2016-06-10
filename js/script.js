var initialOrder = new Array();
var layerOrder = new Array();
$(function() {
	var map = L.map('mapid', {
	    center: [-51.624072, -69.246444],
	    zoom: 13
	});
	var basemap0 = L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
		attribution: '&copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors,<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>',
		maxZoom: 19
	});
	var gglSat = new L.Google('SATELLITE');
	var gglRoad = new L.Google('ROADMAP');
	
	
	
	basemap0.addTo(map);
	map.addLayer(gglSat);
	map.addLayer(gglRoad);
	/*BUSCADOR DE TEXTO (AUN NO SE SOBRE QUE BUSCA)*/
	var osmGeocoder = new L.Control.OSMGeocoder({
		collapsed: false,
		position: 'topright',
		text: 'Search',
	});
	osmGeocoder.addTo(map);
	
	
	
	/*CAPAS BASE*/
	var baseMaps = {'OSM': basemap0, 'GOOGLE SATELLITE': gglSat, 'GOOGLE ROADMAP': gglRoad};
	/*TODO: podemos poner como overlays las capas de datos y se muestran con los checkboxes de seleccion multiple y van aca!*/
	/*L.control.layers(baseLayers, overlays).addTo(map);*/

	layerControl = L.control.layers(baseMaps,{}, {collapsed:true}).addTo(map);
	//L.control.scale({options: {position: 'bottomleft', maxWidth: 100, metric: true, imperial: false, updateWhenIdle: false}}).addTo(map);
	stackLayers();
	//map.on('overlayadd', restackLayers);
	
	var url = 'http://192.168.55.5:8082/geoserver/Renabe/wfs?service=wfs&version=1.1.0&request=GetFeature&typeName=Renabe:GeoDato_Poligono&outputFormat=application%2Fjson';
	
	
	
		 
	$.ajax({
		url: url,
		type: "GET",
		async: true,
		contentType: "application/json",
		
		success: function(data) {
			debugger;
		},
		error: function(jqXHR, textStatus, errorThrown){
			debugger;
		}
		
		
		
		
	});
	
});


function stackLayers() {
	for (index = 0; index < initialOrder.length; index++) {
		map.removeLayer(initialOrder[index]);
		map.addLayer(initialOrder[index]);
	}
}
function restackLayers() {
	for (index = 0; index < layerOrder.length; index++) {
		layerOrder[index].bringToFront();
	}
}