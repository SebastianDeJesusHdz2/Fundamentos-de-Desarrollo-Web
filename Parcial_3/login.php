<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Login</title>

    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <form action="./db/login.php" method="POST">
        <h1>Iniciar sesión</h1>
        <label for="username">Usuario:</label>
        <input type="text" id="username" name="username">
        <label for="password">Contraseña:</label>
        <input type="password" id="password" name="password">
        <button type="submit">Ingresar</button>

        <?php
        if(isset($_GET['error'])) {
            echo "<span class='error'> Error: " . $_GET['error'] . "</span>";
        }
        ?>
    </form>
</body>
</html>