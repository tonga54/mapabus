<?php 

class BusController extends Controller
{
	function index(){
		View::show("index",['Test 0000','Test 1111']);
	}
	
	//function index($empresa,$linea,$variante){
	function getBuses(){
		if(isset($_POST['empresa']) && isset($_POST['lineas']) && $_POST['empresa'] != "" && $_POST['lineas'] != ""){
			$empresa = $_POST['empresa'];
			$lineas = $_POST['lineas'];
			$bus = new Bus($empresa,$lineas);
			$responseJson = $bus->getApiData();
		}
		else{
			header('Status: 400 Bad Request');
			$responseJson = "{status: 'error', text: 'Faltan variables por definir'}";
		}

		echo $responseJson;
	}

}

 ?>