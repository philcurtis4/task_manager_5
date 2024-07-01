// Retrieve tasks and nextId from localStorage
let taskList = JSON.parse(localStorage.getItem("tasks"));
let nextId = JSON.parse(localStorage.getItem("nextId"));

const $saveBtn = $('#save-Btn');
const $deleteBtn = $('#delete-btn');


const $titleInput = $('#title-input');
const $descriptionInput = $('#description-input');
const $dateInput = $('#date-input');




// Todo: create a function to generate a unique task id
function generateTaskId(eventObj) {
    
    const min = Math.pow(10, 14); // Minimum 15-digit number
    const max = Math.pow(10, 15) - 1; // Maximum 15-digit number
    return Math.floor(Math.random() * (max - min + 1)) + min;
    
}




// Todo: create a function to create a task card
function createTaskCard() { 
    //grab tasks in local storage
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    
    $('#todo-cards').empty();
    $('#in-progress-cards').empty();
    $('#done-cards').empty();
   
    
    
    tasks.forEach(function (eventObj) {
        const day = dayjs();
        
        const taskEl = $(
            `<article data-id="${eventObj.id}" class="mt-3 card drag ui-widget-content" >
                <h2>${eventObj.title}</h2>
                <p>${eventObj.description}</p>
                <p>${eventObj.date}</p>
                <button type="button" id="delete-btn" class="btn btn-danger btn-sm">Delete</button>
            </article>`
        )
       
        

        const date = dayjs(eventObj.date);
        
        if(date.isSame(day, 'day')) {
            taskEl.addClass('alert');
        }

        if(day.diff(date) > 0) {
            taskEl.addClass('late');
        }





        if(eventObj.completed === '1'){
            $('#todo-cards').append(taskEl);
            taskEl.removeClass('done');
        }else if(eventObj.completed === '2') {
            $('#in-progress-cards').append(taskEl)
            taskEl.removeClass('done');
        }else {
            $("#done-cards").append(taskEl);
            taskEl.addClass('done');
        }

        $('.box'). droppable({
            accept: 'article',
            drop: handleDrop
        });
        
        $('article').draggable({
            opacity: 0.8,
            
            helper: function (eventObj) {
                const el = $(eventObj.target)
                let clone;
    
                if(el.is('article')){
                    clone = el.clone();
                }else{
                    clone = el.closest('article').clone();
                }
    
                clone.css('width', el.outerWidth());
                return clone;
            }
    
        
        });
    })
      
    }

// Todo: create a function to render the task list and make cards draggable
function renderTaskList() {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];

    tasks.forEach(function (eventObj) {
        const day = dayjs();
       
        
        const date = dayjs(eventObj.date);
        
        if(date.isSame(day, 'day')) {
            taskEl.addClass('alert');
        }

        if(day.diff(date) > 0) {
            taskEl.addClass('late');
        }

        
        



        if(eventObj.completed === '1'){
            $('#todo-cards').append(taskEl);
            taskEl.removeClass('done');
        }
        else if(eventObj.completed === '2') {
            $('#in-progress-cards').append(taskEl)
            taskEl.removeClass('done');
        }else {
            $("#done-cards").append(taskEl);
            taskEl.addClass('done');
        }

        $('.box'). droppable({
            accept: 'article',
            drop: handleDrop
        });
        
        $('article').draggable({
            opacity: 0.8,
            
            helper: function (eventObj) {
                const el = $(eventObj.target)
                let clone;
    
                if(el.is('article')){
                    clone = el.clone();
                }else{
                    clone = el.closest('article').clone();
                }
    
                clone.css('width', el.outerWidth());
                return clone;
            }
    
        
        });
    })
}

// Todo: create a function to handle adding a new task
function handleAddTask(event){
    // get value of each input
    const titleVal = $titleInput.val();
    const descriptionVal = $descriptionInput.val();
    const dateStr = $dateInput.val();
    const dateTime = dayjs(dateStr);
    const dateFormat = dateTime.format('MMM DD YYYY');

    //create an id for the task
    const taskId = generateTaskId();
    
    //create an object that has each value
    const taskObj = {
        title: titleVal,
        description: descriptionVal,
        date: dateStr,
        id: taskId,
        completed: '1'
    }
    
    //pull old data from local or have empty array
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    //push the task obj to the tasks array then convert to JSON

    tasks.push(taskObj);
    const tasksJson = JSON.stringify(tasks);

    //save the task array to the local storag

    localStorage.setItem('tasks', tasksJson);

    $dateInput.val('');
    $titleInput.val('');
    $descriptionInput.val('');

    $('#exampleModal').modal('hide');
    createTaskCard();
    
}

// Todo: create a function to handle deleting a task
function handleDeleteTask(event){
    const btn = $(event.target);
    const taskId = btn.parent('article').data('id');

    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    const filtered = tasks.filter(function (taskObj) {
        if(taskObj.id !== taskId) return true;
    })

    const tasksJson = JSON.stringify(filtered);

    //save the task array to the local storag

    localStorage.setItem('tasks', tasksJson);

    btn.parent('article').remove();
}

// Todo: create a function to handle dropping a task into a new status lane
function handleDrop(event, ui) {
    const box = $(event.target);
    const maybe = $(event.target.children);
    
    const article = $(ui.draggable[0])
    const taskId = article.data('id');
    
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    const task = tasks.find(function (taskObj) {
        if(taskObj.id === taskId) return true;
    })
    

    if(box.hasClass('to-do')) {
        task.completed = '1';
    }else if(box.hasClass('in-progress')){
        task.completed = '2';
    }else if (box.hasClass('done')) {
        task.completed = '3';
    }

    localStorage.setItem('tasks', JSON.stringify(tasks));

    maybe.append(article);
}

// Todo: when the page loads, render the task list, add event listeners, make lanes droppable, and make the due date field a date picker
$(document).ready(function () {
    
    $('#date-input').datepicker();
    
    //renderTaskList();
  

    createTaskCard();
    
    
    $('main').on('click', 'button.btn-danger', handleDeleteTask);
    
    $saveBtn.on('click', handleAddTask);
});



