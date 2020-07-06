const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const cmpltBtn = document.querySelector('.cmplt-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');
const totalTasks = document.querySelector('.total-tasks');
const allTasks = document.querySelector('.all-tasks');
const uncompleteTasks = document.querySelector('.uncomplete-tasks');
const completedTasks = document.querySelector('.completed-tasks');

loadEventListeners();

function loadEventListeners(){
  form.addEventListener('submit', addTask);
  taskList.addEventListener('click', modifyTask);
  clearBtn.addEventListener('click', clearTasks);
  cmpltBtn.addEventListener('click', completeAllTasks);
  allTasks.addEventListener('click', showAllTasks);
  uncompleteTasks.addEventListener('click', showUncompleteTasks);
  completedTasks.addEventListener('click', showCompletedTasks);
}

function addTask(e){
  e.preventDefault();
  if(taskInput.value === ''){
    alert('Add a task');
    return;
  }

  const li = document.createElement('li');
  li.className = 'collection-item';

  const checkBox = document.createElement('a');
  checkBox.className = 'check-item';
  checkBox.innerHTML = '<i class="fas fa-square"></i>';
  li.appendChild(checkBox);


  const itemText = document.createElement('span');
  itemText.appendChild(document.createTextNode(taskInput.value));
  itemText.className = 'item-text';
  li.appendChild(itemText);

  const link = document.createElement('a');
  link.className = 'delete-item';
  link.innerHTML = '<i class="fas fa-trash-alt"></i>';
  li.appendChild(link);

  taskList.appendChild(li);
  taskInput.value = '';

  updateTotalTasks();
}

function modifyTask(e){
  if(e.target.parentElement.classList.contains('delete-item')){
    deleteTask(e.target.parentElement.parentElement);
  }
  if(e.target.parentElement.classList.contains('check-item')){
    completeTask(e.target); 
  }
}

function deleteTask(task){
  task.remove();
  updateTotalTasks();
}

function completeTask(task){
  if(task.classList.contains('fa-square')){
    task.classList.remove('fa-square');
    task.classList.add('fa-check-square');
    task.parentElement.nextSibling.classList.toggle('dashed');
  }
}

function clearTasks(){
  const listItems = document.querySelectorAll('.fa-check-square');
  for(listItem of listItems){
    taskList.removeChild(listItem.parentElement.parentElement);
  }
  
  updateTotalTasks();
}

function completeAllTasks(){
  const listItems = document.querySelectorAll('.collection-item');
  for(listItem of listItems){
    completeTask(listItem.firstChild.firstChild);
  }
}

function updateTotalTasks(){
  totalTasks.innerHTML = `${taskList.childElementCount} tasks`;
}

function showAllTasks(){
  const listItems = document.querySelectorAll('.collection-item');
  for(listItem of listItems){
    listItem.classList.remove('hide');
  }
}

function showCompletedTasks(){
  const listItems = document.querySelectorAll('.collection-item');
  for(listItem of listItems){
    if(listItem.firstChild.firstChild.classList.contains('fa-check-square')){
      listItem.classList.remove('hide');
    }
    else{
      listItem.classList.add('hide');
    }
  }
}

function showUncompleteTasks(){
  const listItems = document.querySelectorAll('.collection-item');
  for(listItem of listItems){
    if(listItem.firstChild.firstChild.classList.contains('fa-square')){
      listItem.classList.remove('hide');
    }
    else{
      listItem.classList.add('hide');
    }
  }
}