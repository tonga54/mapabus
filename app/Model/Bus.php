<?php 
include("Core/ApiData.php");

class Bus extends Model{

	//string
	public $empresa;
	//array string
	public $lineas; 
	//array entero
	//public $variante;

	//function __construct($empresa_, $lineas_, $variante_) {
	function __construct($empresa_, $lineas_) {
       $this->empresa = $empresa_;
       $this->lineas = $lineas_;
       //$this->variante = $variante_;
   }

   function getApiData(){
   	$data_array =  array(
	      "empresa" => $this->empresa,
	      "lineas" => $this->lineas//,
	      //"variante" => $this->variante
	);
	$value = ApiData::post($data_array);
	return $value;
   }

}

 ?>
