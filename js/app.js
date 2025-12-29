const inputTarea = document.getElementById("input-tarea");
const btnAgregar = document.getElementById("btn-agregar");
const listaTareas = document.getElementById("lista-tareas");

const tareasPre = JSON.parse(localStorage.getItem('tareas'));

if (tareasPre) {
    //console.log(tareasPre);
    tareasPre.forEach(tarea => {
        console.log(tarea);
        imprimirTarea(tarea.texto, tarea.completada);
    });
}



btnAgregar.addEventListener("click", function (e) {
    e.preventDefault();
    const valInput = inputTarea.value;
    if (!valInput) {
        return;
    }

    imprimirTarea(valInput, false);

    inputTarea.value = '';
    sincronizarStorage();
});

listaTareas.addEventListener("click", function (e) {
    e.preventDefault();
    if (e.target.tagName === 'BUTTON') {
        e.target.parentElement.remove();
    } else if (e.target.tagName === 'SPAN') {
        e.target.classList.toggle('line-through');
    }

    sincronizarStorage();
});

function sincronizarStorage() {

    const tareas = [];
    const pendientes = listaTareas.querySelectorAll('span');
    if (!pendientes) {
        return;
    }

    pendientes.forEach(pendiente => {

        const tareaObj = {
            texto: pendiente.innerText,
            completada: pendiente.classList.contains('line-through') // Esto ya nos da true o false
        };

        tareas.push(tareaObj);

    });

    console.log(tareas);
    const textoTareas = JSON.stringify(tareas);
    localStorage.setItem('tareas', textoTareas);

}

function imprimirTarea(texto, completada) {

    const lineTh = completada ? 'line-through' : '';

    listaTareas.innerHTML += `
    <li class="flex items-center justify-between bg-gray-50 p-4 rounded-lg border-l-4 border-indigo-500 shadow-sm">
        <span class="text-gray-700 hover:cursor-pointer ${lineTh}">${texto}</span>
        <button class="text-red-400 hover:text-red-600 transition-colors hover:cursor-pointer">
            X
        </button>
    </li>
    `;
}