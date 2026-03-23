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

function generarId() {
    return Math.random().toString(36).substring(2, 8);
}

function init() {
    if (localStorage.getItem('init')) return;
    guardar('usuarios', [{ id: '1', nombre: 'Elena Ríos', correo: 'elena@correo.com', clave: '123456' }]);
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

window.onload = function () {
    init();
    var formulario = document.getElementById('a1');

    formulario.onsubmit = function (e) {
        e.preventDefault();
        var usuarios = obtener('usuarios');
        var nuevo = {
            id: generarId(),
            nombre: document.getElementById('a2').value,
            correo: document.getElementById('a3').value,
            clave: document.getElementById('a4').value
        };
        usuarios.push(nuevo);
        guardar('usuarios', usuarios);
        localStorage.setItem('sesion', nuevo.id);
        nav('inicio/index.html');
    };
};
