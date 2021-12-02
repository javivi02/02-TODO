
// Referencias HTML

import {Todo} from "../classes";
import {todoList} from "../index";

const divTodoList = document.querySelector('.todo-list');
const txtTodo = document.querySelector('.new-todo');

export const crearTodoHtml = (todo) => {

    const htmlTodo = `
    
    <li class="${todo.completado ? 'completed' : ''}" data-id="${todo.id}">
        <div class="view">
            <input class="toggle" type="checkbox" ${todo.completado ? 'checked' : ''}>
            <label>${todo.tarea}</label>
            <button class="destroy"></button>
        </div>
        <input class="edit" value="Create a TodoMVC template">
    </li>
    
    `;

    const div = document.createElement('div');
    div.innerHTML = htmlTodo;
    // Agregado el primer elemento hijo del div, que seria el li
    //divTodoList.append(div.firstElementChild);

    return div.firstElementChild;
}

// Eventos

divTodoList.addEventListener('click', (event)=>{

    console.log(event.target.localName);

    // Selecciono el elemento donde hago click puede ser label, input, button
    const nombreElemento = event.target.localName;
    // Me posiciono en el elemento padre que contendra el <li> data id, subo dos niveles
    const elementoPadre = event.target.parentNode.parentNode;
    // Rescato el atributo id del elemento
    const todoID = elementoPadre.getAttribute('data-id');

    if(nombreElemento.includes('input')){

        todoList.marcarCompletado(todoID); // Marco el objeto como completado, true o false
        elementoPadre.classList.toggle('completed'); // Quito o pongo la clase que me tacha la frase

        console.log(todoList);

    }else if (nombreElemento.includes('button')){

        todoList.elimirarTodo(todoID);
        divTodoList.removeChild(elementoPadre);

        console.log(todoList);

    }

});

txtTodo.addEventListener('keyup',(event)=>{

    //console.log(event);

    if(event.keyCode === 13 && txtTodo.value.length > 0){

        const nuevoTodo = new Todo(txtTodo.value);
        todoList.nuevoTodo(nuevoTodo);
        divTodoList.append(crearTodoHtml(nuevoTodo));

        //console.log(todoList.todos);

        txtTodo.value = '';

    }

});
