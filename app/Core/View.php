<?php 

class View{
    public static $vista;

    static function show($v,$data){
        require(View::$vista . $v . ".php");
    }
}

?>