function obtener(clave) {
    var datos = localStorage.getItem(clave);
    if (datos) {
        return JSON.parse(datos);
    }
    return [];
}

function guardar(clave, valor) {
    localStorage.setItem(clave, JSON.stringify(valor));
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

function cerrarSesion() {
    localStorage.removeItem('sesion');
    nav('main/index.html');
}

function toast(msg) {
    var contenedor = document.getElementById('a11');
    if (!contenedor) return;
    var aviso = document.createElement('div');
    aviso.className = 'toast';
    aviso.textContent = msg;
    contenedor.appendChild(aviso);
    setTimeout(function () {
        contenedor.removeChild(aviso);
    }, 3000);
}

function cargarDatos(usuario) {
    document.getElementById('a4').textContent = usuario.nombre;
    document.getElementById('a2').textContent = usuario.nombre;
    document.getElementById('a5').value = usuario.nombre;
    document.getElementById('a6').value = usuario.correo;
    document.getElementById('a7').value = usuario.clave;
    var bio = usuario.bio || '';
    document.getElementById('a8').value = bio;
}

window.onload = function () {
    var sesion = localStorage.getItem('sesion');
    if (!sesion) {
        nav('login/index.html');
        return;
    }

    var usuario = buscarUsuario(sesion);
    if (!usuario) {
        nav('login/index.html');
        return;
    }

    cargarDatos(usuario);

    document.getElementById('a3').onclick = cerrarSesion;

    document.getElementById('a9').onclick = function () {
        cargarDatos(usuario);
        toast('Cambios descartados.');
    };

    document.getElementById('a10').onclick = function () {
        var nombre = document.getElementById('a5').value.trim();
        var correo = document.getElementById('a6').value.trim();
        var clave = document.getElementById('a7').value;
        var bio = document.getElementById('a8').value.trim();

        if (nombre === '' || correo === '') {
            toast('Nombre y correo son obligatorios.');
            return;
        }

        var usuarios = obtener('usuarios');
        for (var i = 0; i < usuarios.length; i++) {
            if (usuarios[i].id === sesion) {
                usuarios[i].nombre = nombre;
                usuarios[i].correo = correo;
                usuarios[i].clave = clave;
                usuarios[i].bio = bio;
            }
        }
        guardar('usuarios', usuarios);

        usuario = buscarUsuario(sesion);
        cargarDatos(usuario);
        toast('Perfil actualizado correctamente.');
    };
};
