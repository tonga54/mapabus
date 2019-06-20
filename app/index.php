<?php 
include("Core/Config.php");

if(isset($_GET['controlador']) && $_GET['controlador'] != ""){
	$temp = ucfirst(strtolower($_GET['controlador']));
	if(file_exists("Controller/" . $temp . "Controller.php")){
		$model = $temp;
		$controller = $temp."Controller";
	}
}

include("Core/Controller.php");
include("Core/Model.php");

//Cargo el modelo
include("Model/" . $model . ".php");
//Cargo el controlador
include("Controller/" . $controller . ".php");
//Cargo la vista
include("Core/View.php");
View::$vista = "View/" . $model . "/";

$controller = new $controller();

?>