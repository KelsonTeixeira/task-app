const taskApp = {
  taskValue: '',
  taskList: [],
  listContainer: document.querySelector('#list'),
  taskInput: document.querySelector('#task'),
  addFormContainer: document.querySelector('.add-form'),
  addForm: document.querySelector('.add-form form'),
  clearBtn: document.querySelector('#clear'),
  closeBtn: document.querySelector('#close'),
  addBtn: document.querySelector('#add'),

  updateListContainer: () => {
    taskApp.listContainer.innerHTML = '';
    taskApp.taskList.map(task => {
      const taskObj = task.split(':');
      const taskValue = taskObj[0];
      const taskState = parseInt(taskObj[1]);

      if (!taskState) {
        const div = taskApp.createTaskDiv(task, taskApp.listContainer);
        taskApp.createTaskCheckbox(div, taskState);
        taskApp.createTaskLabel(div, taskValue, taskState);
        taskApp.createTaskCloseBtn(div, task);
      }
    });

    taskApp.taskList.map(task => {
      const taskObj = task.split(':');
      const taskValue = taskObj[0];
      const taskState = parseInt(taskObj[1]);

      if (taskState) {
        const div = taskApp.createTaskDiv(task, taskApp.listContainer);
        taskApp.createTaskCheckbox(div, taskState);
        taskApp.createTaskLabel(div, taskValue, taskState);
        taskApp.createTaskCloseBtn(div, task);
      }
    });
  },

  initTaskList: () => {
    const taskListString = localStorage.getItem('taskList');
    if (taskListString) {
      taskApp.taskList = taskListString.split(',');
    }
  },

  displayForm: (display) => {
    if (display) {
      taskApp.addFormContainer.style.display = "flex";
      taskApp.taskInput.focus();
    } else {
      taskApp.addFormContainer.style.display = "none";
    }
  },

  clear: () => {
    let deleteTasks = window.confirm('Deseja excluir todas as tarefas?');
    if (deleteTasks) {
      taskApp.taskList = [];
      taskApp.updateStorage();
      taskApp.updateListContainer();
    }
  },

  updateStorage: () => {
    localStorage.setItem('taskList', taskApp.taskList);
  },

  updateTaskState: (element) => {
    const id = element.parentElement.getAttribute('id');
    const newState = element.checked;
    const taskObj = taskApp.taskList[id].split(':');

    taskObj[1] = newState ? 1 : 0;
    taskApp.taskList[id] = `${taskObj[0]}:${taskObj[1]}`;
    taskApp.updateStorage();
    taskApp.updateListContainer();
  },

  initEventListeners: () => {
    taskApp.addBtn.addEventListener('click', () => taskApp.displayForm(true));
    taskApp.closeBtn.addEventListener('click', () => taskApp.displayForm(false));
    taskApp.clearBtn.addEventListener('click', () => taskApp.clear());
    taskApp.addForm.addEventListener('submit', (event) => taskApp.addTask(event));
    addEventListener('keydown', e => { if (e.code === 'Escape') taskApp.displayForm(false) });
  },

  deleteTask: (id) => {
    taskApp.taskList.splice(id, 1);
    taskApp.updateStorage();
    taskApp.updateListContainer();
  },

  addTask: (event) => {
    event.preventDefault();
    taskApp.taskList.push(`${taskApp.taskInput.value}:0`);
    taskApp.updateStorage();
    taskApp.updateListContainer();
    taskApp.taskInput.value = '';
  },

  createTaskDiv: (task, constainer) => {
    let div = document.createElement('div');
    div.setAttribute('class', 'new-task');
    div.setAttribute('id', taskApp.taskList.indexOf(task));
    constainer.appendChild(div);
    return div;
  },

  createTaskCheckbox: (div, taskState) => {
    let checkbox = document.createElement('input');
    checkbox.setAttribute('type', 'checkbox');
    if (taskState) checkbox.setAttribute('checked', taskState);
    checkbox.addEventListener('change', () => taskApp.updateTaskState(checkbox));
    div.appendChild(checkbox);
  },

  createTaskLabel: (div, taskValue, taskState) => {
    let label = document.createElement('label');
    label.textContent = taskValue;
    if (taskState) label.classList.add("cross");
    div.appendChild(label);
  },

  createTaskCloseBtn: (div, task) => {
    let close = document.createElement('div');
    close.innerHTML = '<i class="fas fa-window-close"></i>';
    close.setAttribute('class', 'del');
    close.addEventListener('click', () => taskApp.deleteTask(taskApp.taskList.indexOf(task)));
    div.appendChild(close);
  },

  init: () => {
    taskApp.initEventListeners();
    taskApp.initTaskList();
    taskApp.updateListContainer()
  }
};

taskApp.init();