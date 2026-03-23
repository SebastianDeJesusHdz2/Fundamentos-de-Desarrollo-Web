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

function init() {
    if (localStorage.getItem('init')) return;
    guardar('usuarios', [
        { id: '1', nombre: 'Elena Ríos', correo: 'elena@correo.com', clave: '123456' }
    ]);
    guardar('obras', [
        { id: '1', autor: '1', titulo: 'El Arquitecto de Sueños', tipo: 'libro', estado: 'publicada', contenido: 'En un mundo donde los sueños pueden ser diseñados como edificios, un joven arquitecto descubre que sus creaciones tienen consecuencias en la realidad. Cada noche, las estructuras que imagina cobran vida, transformando la ciudad mientras todos duermen.' },
        { id: '2', autor: '1', titulo: 'Redes Neuronales y Creatividad', tipo: 'investigacion', estado: 'publicada', contenido: 'Este estudio analiza la intersección entre la inteligencia artificial y los procesos creativos humanos. Mediante una serie de experimentos controlados, se demuestra que las redes neuronales pueden complementar pero no reemplazar la creatividad genuina.' },
        { id: '3', autor: '1', titulo: 'Crónicas del Último Mar', tipo: 'libro', estado: 'publicada', contenido: 'El último océano de la tierra se está evaporando. Marina, una bióloga marina, emprende una expedición desesperada para documentar las especies que quedan antes de que desaparezcan para siempre.' }
    ]);
    localStorage.setItem('init', '1');
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
    var authItems = document.querySelectorAll('.auth');

    if (usuario) {
        if (visitante) visitante.className = 'hid';
        if (logueado) logueado.className = '';
        if (nombre) nombre.textContent = usuario.nombre;
        for (var i = 0; i < authItems.length; i++) {
            authItems[i].className = authItems[i].className.replace('hid', '');
        }
    } else {
        if (visitante) visitante.className = '';
        if (logueado) logueado.className = 'hid';
    }
}

function cerrarSesion() {
    localStorage.removeItem('sesion');
    nav('main/index.html');
}

window.onload = function () {
    init();
    authUI();

    var btnSalir = document.getElementById('a4');
    if (btnSalir) btnSalir.onclick = cerrarSesion;

    var obras = obtener('obras');
    var publicadas = [];
    for (var i = 0; i < obras.length; i++) {
        if (obras[i].estado === 'publicada') {
            publicadas.push(obras[i]);
        }
    }

    var grid = document.getElementById('a5');
    if (grid) {
        var html = '';
        var max = publicadas.length < 3 ? publicadas.length : 3;
        for (var j = 0; j < max; j++) {
            var o = publicadas[j];
            html += '<div class="card" data-id="' + o.id + '">';
            html += '<span class="card-tag">' + o.tipo + '</span>';
            html += '<h3>' + o.titulo + '</h3>';
            html += '<p>' + o.contenido.substring(0, 80) + '...</p>';
            html += '</div>';
        }
        grid.innerHTML = html;

        var cards = grid.querySelectorAll('.card');
        for (var k = 0; k < cards.length; k++) {
            cards[k].onclick = function () {
                sessionStorage.setItem('leer', this.getAttribute('data-id'));
                nav('lectura/index.html');
            };
        }
    }
};
