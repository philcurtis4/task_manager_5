// Retrieve tasks and nextId from localStorage
let taskList = JSON.parse(localStorage.getItem("tasks"));
let nextId = JSON.parse(localStorage.getItem("nextId"));

const $titleInput = $('#title-input');
const $descriptionInput = $('description-input');
const $dateInput = $('date-input');
const dateStr = $dateInput.val();
const dateTime = dayjs(dateStr);
const dateFormat = dateTime.format('MMM DD YYYY');

console.log(dateFormat);

const taskCounter = 1;
// Todo: create a function to generate a unique task id
function generateTaskId(eventObj) {
    
    const taskId = taskCounter;
    taskCounter++;
    return taskId;
    
}

// Todo: create a function to create a task card
function createTaskCard(task) {
    const card = $('<div>').addClass("card");

    const cardTitle = $('<h2>').text('cool');

    const cardDescription = $('<p>>').text('nice');

    card.append(cardTitle, cardDescription);

    $('#todo-cards').append(card);
}

// Todo: create a function to render the task list and make cards draggable
function renderTaskList() {

}

// Todo: create a function to handle adding a new task
function handleAddTask(event){

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

console.log(createTaskCard());