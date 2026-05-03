<?php
    require 'db/db.php';

    if(!isset($_GET['id'])) {
        header("Location: ../adminProducts.php?error=Id Invalido");
        return;
    }

    $id = $_GET['id'];

    $sql = "SELECT * FROM products WHERE id = $id";
    $result = mysqli_query($conn, $sql);
    $product = mysqli_fetch_array($result);

    if(!isset($product)) {
        header("Location: ../adminProducts.php?error=Producto no encontrado");
        return;
    }
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>

    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <h1 class="title">Actualizar producto</h1>
    <form action="./db/updateProduct.php" method="POST">
        <label for="id">Id</label>
        <input type="text" id="id" name="id" readonly value="<?php echo $product['id']; ?>">
        <label for="name">Nombre</label>
        <input type="text" id="name" name="name" value="<?php echo $product['name']; ?>">
        <label for="price">Price</label>
        <input type="number" id="price" name="price" value="<?php echo $product['price']; ?>">

        <label for="image">Image</label>
        <input type="file">

        <button type="submit">Editar</button>

        <?php
        if(isset($_GET['error'])) {
            echo "<span class='error'> Error: " . $_GET['error'] . "</span>";
        }
        ?>
    </form>
</body>
</html>