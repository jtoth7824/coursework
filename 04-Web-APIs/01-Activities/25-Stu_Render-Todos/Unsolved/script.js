var todoInput = document.querySelector("#todo-text");
var todoForm = document.querySelector("#todo-form");
var todoList = document.querySelector("#todo-list");
var todoCountSpan = document.querySelector("#todo-count");

var todos = ["Learn HTML", "Learn CSS", "Learn JavaScript"];

renderTodos();

function renderTodos() {

    todoList.innerHTML = "";
    todoCountSpan.textContent = todos.length;
    for(var i = 0; i < todos.length; i++) {

        var li =  document.createElement("li");
        li.textContent = todos[i];
        todoList.appendChild(li);
    }
}

