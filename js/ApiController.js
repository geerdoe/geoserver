function ApiController($scope, $http){
	function test(){
		$http.get('http://192.168.55.5:8082/geoserver/Renabe/wfs?service=wfs&version=1.1.0&request=GetFeature&typeName=Renabe:GeoDato_Poligono&outputFormat=application%2Fjson').success(function(data) {
			debugger;
		}).error(function(response) {
			debugger;
		});
	}	
}