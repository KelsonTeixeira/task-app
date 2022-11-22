var taskValue = '';
var taskList = [];
const List = document.querySelector('#list');

const updateTaskList = () => {  
  let taskListString = localStorage.getItem('taskList');

  if (taskListString) taskList = taskListString.split(',');
}

const updateState = (checkbox) => {
  console.log(checkbox.parentElement);
  let id = checkbox.parentElement.getAttribute('id');
  let newState = checkbox.checked;
  console.log(newState);
  console.log(id)
  let taskObj = taskList[id].split(':');

  taskObj[1] = newState ? 1 : 0;
  taskList[id] = `${taskObj[0]}:${taskObj[1]}`;
  localStorage.setItem('taskList', taskList);
  updateTaskList();
  setList();
}

const insertElement = (task, taskValue, taskState) => {
  let div = document.createElement('div');
  div.setAttribute('class', 'new-task');
  div.setAttribute('id', taskList.indexOf(task));
  List.appendChild(div);

  let checkbox = document.createElement('input');
  checkbox.setAttribute('type', 'checkbox');
  if (taskState ) checkbox.setAttribute('checked', taskState);
  checkbox.addEventListener('change', () => updateState(checkbox));
  div.appendChild(checkbox);

  let label = document.createElement('label');
  label.textContent = taskValue;
  if (taskState ) label.classList.add("cross");
  div.appendChild(label);

  let close = document.createElement('div');
  close.innerHTML = '<i class="fas fa-window-close"></i>';
  close.setAttribute('class', 'del');
  close.addEventListener('click', () => del(taskList.indexOf(task)));
  div.appendChild(close);
}

const setList = () => {
  List.innerHTML = '';
  console.log('here')
  taskList.map(task => {
    let taskObj = task.split(':');
    let taskValue = taskObj[0];
    let taskState = parseInt(taskObj[1]);

    if(!taskState) {
      insertElement(task, taskValue, taskState);
    }
  });

  taskList.map(task => {
    let taskObj = task.split(':');
    let taskValue = taskObj[0];
    let taskState = parseInt(taskObj[1]);

    if(taskState) {
      insertElement(task, taskValue, taskState);
    }
  });
}

const add = (e) => {
  e.preventDefault();
  let taskInput = document.querySelector('#task');
  taskList.push(`${task.value}:0`);
  localStorage.setItem('taskList', taskList);
  taskInput.value = '';
  setList();
}

const clear = () => {
  let deleteTasks = window.confirm('Deseja excluir todas as tarefas?');
  if (deleteTasks) {
    taskList = [];
    localStorage.setItem('taskList', '');
    return true;
  }
  return false;
}

const del = async (id) => {
  taskList.splice(id, 1);
  localStorage.setItem('taskList', taskList);
  updateTaskList();
  setList();
}

document.querySelector('#add').addEventListener('click', () => {
  document.querySelector('.add-form').style.display = "flex";
  let taskInput = document.querySelector('#task');
  taskInput.focus();
});

document.querySelector('#close').addEventListener('click', () => {
  document.querySelector('.add-form').style.display = "none";
});

addEventListener('keydown', e => {
  if (e.code === 'Escape') {
    document.querySelector('.add-form').style.display = "none";
  }
});

document.querySelector('#clear').addEventListener('click', () => {
  clear();
  setList();
});

updateTaskList();
setList();
