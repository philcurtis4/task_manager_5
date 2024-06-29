// Retrieve tasks and nextId from localStorage
let taskList = JSON.parse(localStorage.getItem("tasks"));
let nextId = JSON.parse(localStorage.getItem("nextId"));

const $saveBtn = $('#save-Btn');

const $titleInput = $('#title-input');
const $descriptionInput = $('#description-input');
const $dateInput = $('date-input');
const dateStr = $dateInput.val();
const dateTime = dayjs(dateStr);
const dateFormat = dateTime.format('MMM DD YYYY');

console.log(dateFormat);

let taskCounter = 1;
// Todo: create a function to generate a unique task id
function generateTaskId(eventObj) {
    
    let taskId = taskCounter;
    taskCounter++;
    return taskId;
    
}

// Todo: create a function to create a task card
function createTaskCard(task) { 
    //grab tasks in local storage
    const tasks = JSON.parse(localStorage.getItem("tasks"));

    for(const task of tasks){

    //create a div for the card
    const card = $('<div>').addClass("card");

    //create h2 for text for title
    const cardTitle = $('<h2>').text(task.title);

    //create p for text of descriptopm
    const cardDescription = $('<p>').text(task.description);
       // console.log(task.description);
    //create p for text of the date
    const cardDate = $('<p>').text(task.date);

    //create a delete button

    const deleteBtn = $('<button type="button" id="delete-btn" class="btn btn-danger btn-sm">').text('Delete').css({
        'width': '50%',
        "display": "block",  // Set display to block
        "margin": "0 auto"
    });

    //add the three to the card div
    card.append(cardTitle, cardDescription, cardDate, deleteBtn);

    //add to the todo section to test if works
    $('#todo-cards').append(card);
    }
}
// Todo: create a function to render the task list and make cards draggable
function renderTaskList() {

}

// Todo: create a function to handle adding a new task
function handleAddTask(event){
    // get value of each input
    const titleVal = $titleInput.val();
    const descriptionVal = $descriptionInput.val();
    const dateVal = dateFormat;

    //create an id for the task
    const taskId = generateTaskId();

    //create an object that has each value
    const taskObj = {
        title: titleVal,
        description: descriptionVal,
        date: dateVal,
        Id: taskId
    }
    
    //pull old data from local or have empty array
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    //push the task obj to the tasks array then convert to JSON

    tasks.push(taskObj);
    const tasksJson = JSON.stringify(tasks);

    //save the task array to the local storag

    localStorage.setItem('tasks', tasksJson);

    createTaskCard();
}

// Todo: create a function to handle deleting a task
function handleDeleteTask(event){

}

// Todo: create a function to handle dropping a task into a new status lane
function handleDrop(event, ui) {

}

// Todo: when the page loads, render the task list, add event listeners, make lanes droppable, and make the due date field a date picker
$(document).ready(function () {
    $('#date-input').datepicker();
});

$saveBtn.on('click', handleAddTask);
