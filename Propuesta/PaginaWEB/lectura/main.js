function obtener(clave) {
    var datos = localStorage.getItem(clave);
    if (datos) {
        return JSON.parse(datos);
    }
    return [];
}

function nav(ruta) {
    window.location.href = document.querySelector('base').href + ruta;
}

function buscarUsuario(id) {
    var usuarios = obtener('usuarios');
    for (var i = 0; i < usuarios.length; i++) {
        if (usuarios[i].id === id) return usuarios[i];
    }
    return null;
}

function authUI() {
    var sesion = localStorage.getItem('sesion');
    var usuario = buscarUsuario(sesion);
    var visitante = document.getElementById('a1');
    var logueado = document.getElementById('a2');
    var nombre = document.getElementById('a3');

    if (usuario) {
        if (visitante) visitante.className = 'hid';
        if (logueado) logueado.className = '';
        if (nombre) nombre.textContent = usuario.nombre;
    }
}

function cerrarSesion() {
    localStorage.removeItem('sesion');
    nav('main/index.html');
}

window.onload = function () {
    authUI();

    var btnSalir = document.getElementById('a4');
    if (btnSalir) btnSalir.onclick = cerrarSesion;

    document.getElementById('a5').onclick = function () {
        nav('explorador/index.html');
    };

    var idObra = sessionStorage.getItem('leer');
    if (!idObra) {
        nav('explorador/index.html');
        return;
    }

    var obras = obtener('obras');
    var obra = null;
    for (var i = 0; i < obras.length; i++) {
        if (obras[i].id === idObra) {
            obra = obras[i];
        }
    }

    if (!obra) {
        nav('explorador/index.html');
        return;
    }

    document.getElementById('a6').textContent = obra.titulo;

    var autor = buscarUsuario(obra.autor);
    if (autor) {
        document.getElementById('a7').textContent = 'Por ' + autor.nombre;
    } else {
        document.getElementById('a7').textContent = 'Autor Desconocido';
    }

    if (obra.contenido) {
        document.getElementById('a8').innerHTML = obra.contenido;
    } else {
        document.getElementById('a8').innerHTML = '<p>Esta obra no tiene contenido aún.</p>';
    }
};
