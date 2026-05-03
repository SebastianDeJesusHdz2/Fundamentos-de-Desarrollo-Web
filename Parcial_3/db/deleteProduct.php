<?php
require "db.php";

if(!isset($_GET["id"])) {
    header("Location: ../adminProducts.php");
    return;
}

$_GET["id"];

$sql = "DELETE FROM products WHERE id = " . $_GET["id"];

try {
    mysqli_query($conn, $sql);
    header("Location: ../adminProducts.php");
} catch (Exception $e) {
    header("Location: ../adminProducts.php?error=" . $e->getMessage());
    return;
}

?>
