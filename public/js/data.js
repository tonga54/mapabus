//Global variables
var map;
var mapOptions;
var marcadores = [];
var intervalo;
var bus = {
    	empresa:"70",
    	lineas:["300"]
    	//variante:[1659]
	};
var geoLocalizacion = null;
var primerLlamada = false;

var icons = {
	bus : "https://img.icons8.com/color/48/000000/trolleybus.png",
	ubicacion : "https://img.icons8.com/office/40/000000/marker.png"
};

function initMap() {
	mapOptions = {
        zoom: 15,
        disableDefaultUI: true,
        zoomControl: true
    }

	if (!navigator.geolocation){
    	alert("Navegacion no soportada por el navegador");
    	mapOptions.center = new google.maps.LatLng(-34.909030, -56.166305);
  	}else{
  		navigator.geolocation.getCurrentPosition(success, error);
  	}

    map = new google.maps.Map(document.getElementById("map"), mapOptions);
    actualizarMarcadores();
    intervalo = setInterval(actualizarMarcadores, 9000);

    /*
    CALCULAR TIEMPO
    var contentString = '<div id="content"></div>';
	var infowindow = new google.maps.InfoWindow({
	  content: contentString,
	  maxWidth: 200
	});
	*/
}

function success(position) {
	//mapOptions.center = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
	var pos = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
	map.center = pos;
	geoLocalizacion = pos;

    map.panTo(map.center);
    var marcador = new google.maps.Marker({
            position: map.center,
            title: "Tu",
            animation: google.maps.Animation.BOUNCE,
            icon:icons.ubicacion,
        });
    marcador.setMap(map);
}

function error() {
	alert("ERROR: Activa la localizacion");
	map.center = new google.maps.LatLng(-34.894896, -56.165096);
	map.panTo(map.center);
}

function getBuses(bus){
	$.ajax({  
	    type: 'POST',  
	    url: '../app/index.php?controlador=bus&accion=getBuses', 
	    data: bus,
	    cache: false,
	    success: function(response) {
	    	if(!primerLlamada){
	    		$(".loader").css("display","none");
	    		console.log($(".loader").css("display"));
	    		primerLlamada = true;
	    	}
	    	var buses = JSON.parse(response);
    		agregarMarcadores(buses.features);
	    },error: function(response){
			console.log("ERROR", response);
		}
	});

}

function agregarMarcadores(buses){
	//Eliminamos los marcadores justo antes de agregar los nuevos
	eliminarMarcadores();
	for (var i = 0; i < buses.length; i++) {
		var marcador = new google.maps.Marker({
            position: new google.maps.LatLng(buses[i].geometry.coordinates[1], buses[i].geometry.coordinates[0]),
            title: buses[i].properties.codigoBus.toString(),
            codigoBus: buses[i].properties.codigoBus,
            variante: buses[i].properties.variante,
            visible: false,
            //animation: google.maps.Animation.BOUNCE,
            icon:icons.bus
        });
        
		//CALCULAR TIEMPO
        //marcador.addListener('click',tiempoDemora);

        if(document.getElementById("slcUb").value == "Ida"){
			if(marcador.variante == 1659){
				marcador.setVisible(true);
			}
		}
		else
		{
			if(marcador.variante == 1667){
				marcador.setVisible(true);
			}
		}

        marcadores.push(marcador);
        marcador.setMap(map);
    }
}

function cambiarSentido(){
	for (var i = 0; i < marcadores.length; i++) {
		if(document.getElementById("slcUb").value == "Ida"){
			if(marcadores[i].variante == 1659){
				marcadores[i].setVisible(true);
			}
			else{
				marcadores[i].setVisible(false);	
			}
		}
		else
		{
			if(marcadores[i].variante == 1667){
				marcadores[i].setVisible(true);
			}
			else{
				marcadores[i].setVisible(false);
			}
		}
    }
}

function actualizarMarcadores(){
	getBuses(bus);	
}

function eliminarMarcadores(){
	for(var i = 0; i < marcadores.length; i++){
		marcadores[i].setMap(null);
	}
	marcadores = [];
}

document.getElementById("slcUb").onchange = function () {
	cambiarSentido();
};

//REMUEVE "Popup de google maps".
var intervaloPopup = setInterval(cerrarPopup, 1);
function cerrarPopup(){
	if($(".dismissButton").length > 0){
		$(".dismissButton").click();
		clearInterval(intervaloPopup);
	}
}

//REMUEVE "Powered by 000webhost"
window.onload = () => {
   let bannerNode = document.querySelector('[alt="www.000webhost.com"]').parentNode.parentNode;
   bannerNode.parentNode.removeChild(bannerNode);
}

/*
CALCULAR TIEMPO

function tiempoDemora(e){
  if(geoLocalizacion != null){
  	calcularTiempoDemora(e);
  	contentString = '<div id="content">Tiempo de demora estimado: </div>';	
  }
  else{
  	contentString = '<div id="content">Se necesita tu ubicacion para calcular el tiempo de demora del bus seleccionado</div>';	
  }
  
  infowindow.open(map, marker);
}

      

function calcularTiempoDemora(marcador){
	var service = new google.maps.DistanceMatrixService();
	console.log(marcador);
	service.getDistanceMatrix(
	  {
	    origins: [geoLocalizacion,"Tu ubicacion"],
	    destinations: [marcador.latLng,"Bus"],
	    travelMode: 'DRIVING',
	    drivingOptions: {
		    departureTime: new Date(Date.now()),  // for the time N milliseconds from now.
		    trafficModel: 'pessimistic'
	    },
	    avoidHighways: false,
	    avoidTolls: false,
	  }, callback);
}

function callback(response, status) {
  console.log(response);
}
*/

//SERVICE WORKER

if ('serviceWorker' in navigator) {
    console.log("Will the service worker register?");
    navigator.serviceWorker.register('../../service-worker.js')
      .then(function(reg){
        console.log("Yes, it did.");
      }).catch(function(err) {
        console.log("No it didn't. This happened: ", err)
      });
}