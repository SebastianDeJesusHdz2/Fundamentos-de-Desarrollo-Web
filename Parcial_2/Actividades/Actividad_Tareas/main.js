function agregar() {
    const inputTarea = document.getElementById('inputTarea');
    const listaTareas = document.getElementById('listaTareas');
    const texto = inputTarea.value;

    if (texto !== "") {
        const li = document.createElement('li');
        li.className = 'tarjeta';
        
        const span = document.createElement('span');
        span.textContent = texto;

        const btnCompletar = document.createElement('button');
        btnCompletar.textContent = '✔';
        
        btnCompletar.onclick = function() {
            li.className = 'tarjeta completada';
        };

        const btnBorrar = document.createElement('button');
        btnBorrar.textContent = '✘';
        
        btnBorrar.onclick = function() {
            listaTareas.removeChild(li);
        };

        li.appendChild(span);
        li.appendChild(btnCompletar);
        li.appendChild(btnBorrar);

        listaTareas.prepend(li);

        inputTarea.value = "";
    }
}
