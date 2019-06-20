<?php   

class Controller{

    function __construct(){
        if(isset($_GET['accion'])){
            if(method_exists($this,$_GET['accion'])){
                $accion = $_GET['accion'];
                $this->$accion();
            }
        }else{
            $this->index();
        }
    }

}

?>