<?php
    require 'db/db.php';
    session_start();

    if(isset($_SESSION["username"])) {
        $username = $_SESSION["username"];
        $role = $_SESSION["role"];

        if($role != "admin") {
            header("Location: ./home.php?error=No tienes permisos para acceder a esta página");
            return;
        }
    } else {
        header("Location: ./login.php?error=No has iniciado sesión");
        return;
    }

    $sql = "SELECT * FROM products";
    $result = mysqli_query($conn, $sql);
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
    <h1 class="title">Crear producto</h1>
    <form action="./db/insertProduct.php" method="POST" enctype="multipart/form-data">
        <label for="name">Nombre</label>
        <input type="text" id="name" name="name">
        <label for="price">Price</label>
        <input type="number" id="price" name="price">

        <label for="image">Image</label>
        <input type="file" id="image" name="image">

        <button type="submit">Crear</button>

        <?php
        if(isset($_GET['error'])) {
            echo "<span class='error'> Error: " . $_GET['error'] . "</span>";
        }
        ?>
    </form>

    <h1 class="title">Administrar productos</h1>

    <div class="products-container">
        <?php
        while($products = mysqli_fetch_array($result)) {
        ?>
        <div class="product-item">
            <img src="./images/<?php echo $products['image']; ?>" alt="Imagen del producto">
            <p class="product-name">
                <?php echo $products['name']; ?>
            </p>
            <p class="product-price">
                <?php echo '$' . number_format($products['price'], 2, "."); ?>
            </p>
            <button onclick=" window.location.href= './editProduct.php?id=<?php echo $products['id']; ?>'">
                Editar
            </button>
            <button onclick=" window.location.href= './db/deleteProduct.php?id=<?php echo $products['id']; ?>'">
                Eliminar
            </button>
        </div>
        <?php
        }
        ?>

    </div>

    <a href="./db/logout.php">Cerrar sesión</a>
</body>
</html>