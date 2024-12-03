// Selección de elementos del DOM
const taskInput = document.getElementById('input-search');
const addTaskButton = document.querySelector('.add-btn');
const taskList = document.getElementById('task-list');
const totalCounter = document.querySelector('#task-1div span');
const completedCounter = document.querySelector('#task-2div span');
const incompleteCounter = document.querySelector('#task-3div span');

// Función para limpiar las tareas iniciales
function clearInitialTasks() {
    taskList.innerHTML = '';
}

// Actualización de los contadores
function updateCounters() {
    const totalTasks = taskList.children.length;
    const completedTasks = document.querySelectorAll('.list-item.completed').length;
    const incompleteTasks = totalTasks - completedTasks;

    totalCounter.textContent = `TASKS: ${totalTasks}`;
    completedCounter.textContent = `COMPLETED: ${completedTasks}`;
    incompleteCounter.textContent = `INCOMPLETED: ${incompleteTasks}`;
}

// Agregar una nueva tarea con validación
addTaskButton.addEventListener('click', () => {
    const taskText = taskInput.value.trim();
    if (taskText === '') {
        alert('La tarea no puede estar vacía.');
        return;
    }

    // Crear un nuevo elemento de tarea
    const taskItem = document.createElement('li');
    taskItem.className = 'list-item';
    taskItem.innerHTML = `
        <button class="btn-ready" aria-label="Mark as ready">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" width="24" height="24">
                <path stroke-linecap="round" stroke-linejoin="round" d="m4.5 12.75 6 6 9-13.5" />
            </svg>
        </button>
        <input type="text" class="input-task" value="${taskText}" readonly>
        <button class="btn-delete" aria-label="Delete task">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" width="24" height="24">
                <path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
            </svg>
        </button>
    `;

    // Evento para marcar como completada
    taskItem.querySelector('.btn-ready').addEventListener('click', () => {
        taskItem.classList.toggle('completed');
        updateCounters();
    });

    // Evento para eliminar la tarea
    taskItem.querySelector('.btn-delete').addEventListener('click', () => {
        taskItem.remove();
        updateCounters();
    });

    // Añadir la tarea a la lista y actualizar contadores
    taskList.appendChild(taskItem);
    taskInput.value = '';
    updateCounters();
});

// Limpiar las tareas iniciales y actualizar los contadores al cargar la página
clearInitialTasks();
updateCounters();
