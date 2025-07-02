document.addEventListener("DOMContentLoaded", () => {
  const todoListInput = document.querySelector("#todoListInput");
  const todoListDecription = document.querySelector("#todoListDescription");
  const addBtn = document.querySelector("#btn");
const todoDiv = document.querySelector('#todo-List-Item');
const clearBtn = document.querySelector('#clear-btn');
  //save into local Storage
  const todos = JSON.parse(localStorage.getItem("todos")) || [];
  renderToDo();
  //To render the todo on the page
  function renderToDo() {
    todoDiv.innerHTML = todos.map((todo, index) => {
          const isDone = todo.status === 'done';
      return `
       <div class="card">
    <h3 class = "${isDone ? 'line-through' : ''}">${todo.title}</h3>
    <pre class = "${isDone ? 'line-through' : ''}">${todo.description}</pre>
    <div class="status ${isDone ? 'status-checked' : 'status-pending'}">
        <button class="btn" onclick="addToggle(${index})"><i class="fa-solid ${isDone ? 'fa-check' : 'fa-clock'}"></i ></button>
        <span>${isDone ? 'Completed' : 'Pending'}</span>
    </div> 
        <div class="card-btn">
            <button class="btn" onclick = "editToDo(${index})"><i class="fa-solid fa-pen-to-square"></i>Edit</button>
            <button class="btn" onclick = "deleteToDo(${index})"><i class="fa-solid fa-trash"></i>Delete</button>
            </div>
        </div>
     `
    }).join("");
  }
  //function that gets todo
  function addToDo() {
    const title = todoListInput.value.trim();
    const description = todoListDecription.value.trim();
    if(title){
    todos.push({
      title: title,
      description: description,
      status:"pending"
    });
}else{
    alert('Input Fields cannot be empty')
}
    todoListInput.value = "";
    todoListDecription.value = "";
   /*  console.log(todos); */
    //set LocalStorage
    localStorage.setItem("todos", JSON.stringify(todos));
    renderToDo();
  }
deleteToDo = (index) =>{
    todos.splice(index, 1);
    localStorage.setItem("todos" , JSON.stringify(todos));
  renderToDo();
}
window.editToDo = (index) =>{
    const todoEdit = todos[index];
    todoListInput.value = todoEdit.title || '';
    todoListDecription.value = todoEdit.description || '';
    renderToDo();
    todos.splice(index , 1);
    
    localStorage.setItem("todos", JSON.stringify(todos));
    //clear the input fields
    //re-render the todo list   
  
}
//function to toggle status
window.addToggle = (index) =>{
    const todo = todos[index];
    todo.status = todo.status === 'done' ? 'pending':'done';
    localStorage.setItem('todos' , JSON.stringify(todos));
    renderToDo();
}

clearAllBtn.addEventListener("click", () => {
  if (confirm("Are you sure you want to clear all tasks?")) {
    todos.length = 0;
    localStorage.removeItem("todos");
    renderToDo();
  }
});
  //click event Listener
  addBtn.addEventListener("click", () => {
    addToDo();
  });
});
