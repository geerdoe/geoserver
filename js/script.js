var initialOrder = new Array();
var layerOrder = new Array();

$(function() {
	var map = L.map('mapid', {
	    center: [-51.624072, -69.246444],
	    zoom: 5
	});
	var basemap0 = L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
		attribution: '&copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors,<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>',
		maxZoom: 24
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
	//L.control.layers(baseLayers,overlays).addTo(map);

	layerControl = L.control.layers(baseMaps,{}, {collapsed:true}).addTo(map);
	//L.control.scale({options: {position: 'bottomleft', maxWidth: 100, metric: true, imperial: false, updateWhenIdle: false}}).addTo(map);
	stackLayers();
	//map.on('overlayadd', restackLayers);
	
	//var rootUrl = 'http://192.168.5.145:8082/geoserver/Renabe/wfs'; //PREPROD
	//var rootUrl = 'http://192.168.55.5:8082/geoserver/Renabe/wfs'; //TESTING
	var rootUrl = 'http://192.168.5.144:8082/geoserver/Renabe/wfs'; //PROD
	
	//http://www.yourgeoserver.com/geoserver/myws/ows?SERVICE=WFS&REQUEST=GetCapabilities

	var defaultParameters = {
		    service: 'WFS',
		    version: '1.0.0',
		    request: 'GetFeature',
		    //featureId: 'Renabe:	GeoDato_Poligono_CIE_DIVISION', prod
		    typeName: 'GeoDato_Poligono_CIE_DIVISION',
		    maxFeatures: 5,
		    outputFormat: 'text/javascript',
		    format_options: 'callback: getJson',
		    srsName:'EPSG:4326'

		};

	var parameters = L.Util.extend(defaultParameters);
	//console.log(rootUrl + L.Util.getParamString(parameters));
	$.ajax({
		method: "GET",
	    jsonp : false,
	    url: rootUrl + L.Util.getParamString(parameters),
	    dataType: 'jsonp',
	    jsonpCallback: 'getJson',
	    success: handleJson
	});

	var group = new L.featureGroup().addTo(map);
	var geojsonlayer;
	function handleJson(data) {
		debugger;
//	    console.log(data);
	    geojsonlayer=L.geoJson(data, {
	        onEachFeature: function (feature, my_Layer) {
	        	debugger;
							my_Layer.bindPopup("str.1: "+feature.properties.str1+"<br />cat: "+feature.properties.cat);
						  },
	        pointToLayer: function (feature, latlng) {
	        	debugger;
	            //return L.circleMarker(latlng, geojsonMarkerOptions);
				return L.circleMarker(latlng//, geojsonMarkerOptions
				);
	            //return L.marker(latlng);
	        }
	    }).addTo(group);
		map.fitBounds(group.getBounds());
	}


	function getJson(data) {
		debugger;
	console.log("callback function fired");
	}
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