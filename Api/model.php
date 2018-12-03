<?php

include_once "db.php";


function product_model(){
global $conn;
$sql = "SELECT * FROM products";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    $rows = array();
while($r = mysqli_fetch_assoc($result)) {
    $rows[] = $r;
}
return $rows;

} else {
     return array();
}

}


?>
