<?php
require "db.php";

if(!isset($_POST["id"]) || !isset($_POST["name"]) || !isset($_POST["price"])) {
    header("Location: ../adminProducts.php");
    return;
}

$_POST["id"];
$_POST["name"];
$_POST["price"];

$sql = "UPDATE products SET name = '" . $_POST["name"] . "', price = " . $_POST["price"] . " WHERE id = " . $_POST["id"];

try {
    mysqli_query($conn, $sql);
    header("Location: ../adminProducts.php");
} catch (Exception $e) {
    header("Location: ../adminProducts.php?error=" . $e->getMessage());
    return;
}

?>
