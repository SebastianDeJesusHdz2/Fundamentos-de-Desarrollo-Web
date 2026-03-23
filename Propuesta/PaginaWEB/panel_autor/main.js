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

window.onload = function () {
    var sesion = localStorage.getItem('sesion');
    if (!sesion) {
        nav('login/index.html');
        return;
    }

    var usuario = buscarUsuario(sesion);
    var nombre = document.getElementById('a2');
    if (usuario && nombre) nombre.textContent = usuario.nombre;

    document.getElementById('a3').onclick = cerrarSesion;

    document.getElementById('a4').onclick = function () {
        sessionStorage.setItem('editar', '');
        nav('editor/index.html');
    };

    var obras = obtener('obras');
    var misObras = [];
    for (var i = 0; i < obras.length; i++) {
        if (obras[i].autor === sesion) {
            misObras.push(obras[i]);
        }
    }

    var contenedor = document.getElementById('a5');
    var mensaje = document.getElementById('a6');

    if (misObras.length === 0) {
        mensaje.className = 'empty';
        return;
    }

    var html = '';
    for (var j = 0; j < misObras.length; j++) {
        var o = misObras[j];
        html += '<div class="card" data-id="' + o.id + '">';
        html += '<span class="card-tag">' + o.tipo + '</span>';
        html += '<h3>' + o.titulo + '</h3>';
        html += '<p class="st">Estado: ' + o.estado + '</p>';
        html += '</div>';
    }
    contenedor.innerHTML = html;

    var cards = contenedor.querySelectorAll('.card');
    for (var k = 0; k < cards.length; k++) {
        cards[k].onclick = function () {
            sessionStorage.setItem('editar', this.getAttribute('data-id'));
            nav('editor/index.html');
        };
    }
};
