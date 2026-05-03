<?php
require "db.php";

if(!isset($_POST["name"]) || !isset($_POST["price"]) || !isset($_FILES["image"])) {
    header("Location: ../adminProducts.php?error=Datos incompletos");
    return;
}

return;

$_POST["name"];
$_POST["price"];

$imageName = $_FILES["image"]["name"];
$type = $_FILES["image"]["type"];
$path = $_FILES["image"]["tmp_name"];

if(!strpos($type, "jpeg") && !strpos($type, "png") && !strpos($type, "jpg")) {
    header("Location: ../adminProducts.php?error=Archivo no permitido");
    return;
}

$sql = "INSERT INTO products (name, price, image) VALUES ('" . $_POST["name"] . "', " . $_POST["price"] . ", '" . $imageName . "')";

try {
    mysqli_query($conn, $sql);
    move_uploaded_file($path, "../images/$imageName");
    header("Location: ../adminProducts.php");
} catch (Exception $e) {
    header("Location: ../adminProducts.php?error=" . $e->getMessage());
    return;
}

?>