<?php
ini_set('display_errors', 1);
header("Access-Control-Allow-Origin: *");
include_once "db.php";
include_once "model.php";



// get_products(){

$product_list=product_model();
echo json_encode($product_list);




//get_products();


?>
