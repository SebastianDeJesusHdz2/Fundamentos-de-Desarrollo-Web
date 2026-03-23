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
    var contenedor = document.getElementById('a10');
    if (!contenedor) return;
    var aviso = document.createElement('div');
    aviso.className = 'toast';
    aviso.textContent = msg;
    contenedor.appendChild(aviso);
    setTimeout(function () {
        contenedor.removeChild(aviso);
    }, 3000);
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
        nav('panel_autor/index.html');
    };

    var idObra = sessionStorage.getItem('editar');
    var obra = null;

    if (idObra) {
        var obras = obtener('obras');
        for (var i = 0; i < obras.length; i++) {
            if (obras[i].id === idObra) {
                obra = obras[i];
            }
        }
        if (obra) {
            document.getElementById('a5').value = obra.titulo;
            document.getElementById('a6').value = obra.tipo;
            document.getElementById('a7').value = obra.estado;
            document.getElementById('a9').innerHTML = obra.contenido;
        }
    }

    document.getElementById('a8').onclick = function () {
        var titulo = document.getElementById('a5').value.trim();
        if (titulo === '') {
            toast('El título es obligatorio.');
            return;
        }

        var lista = obtener('obras');

        if (!obra) {
            obra = {
                id: generarId(),
                autor: sesion,
                titulo: titulo,
                tipo: document.getElementById('a6').value,
                estado: document.getElementById('a7').value,
                contenido: document.getElementById('a9').innerHTML
            };
            lista.push(obra);
        } else {
            for (var j = 0; j < lista.length; j++) {
                if (lista[j].id === obra.id) {
                    lista[j].titulo = titulo;
                    lista[j].tipo = document.getElementById('a6').value;
                    lista[j].estado = document.getElementById('a7').value;
                    lista[j].contenido = document.getElementById('a9').innerHTML;
                }
            }
        }

        guardar('obras', lista);
        sessionStorage.setItem('editar', obra.id);
        toast('Obra guardada correctamente.');
    };
};
