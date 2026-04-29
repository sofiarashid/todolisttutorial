// array stores all task text (the actual tasks)
let tasks = []

// array stores if task is done or not (true = done, false = not done)
let completedTasks = []


// -----------------------------------------------------------------------------------
// function to add a new task
function addTask() {

    // get input box
    let input = document.getElementById('taskInput')

    // get text from input and remove extra spaces
    let text = input.value.trim()

    // if empty, do nothing
    if (!text) return

    // add task to list
    tasks.push(text)

    // mark it as not completed yet
    completedTasks.push(false)

    // clear input box
    input.value = ''

    // put cursor back in input box
    input.focus()

    // update screen
    displayTasks()
}


// -----------------------------------------------------------------------------------
// when add button is clicked, run addTask
document.getElementById('addTaskBtn').addEventListener('click', addTask)


// when Enter key is pressed, add task
document.getElementById('taskInput').addEventListener('keydown', function (e) {
    if (e.key === 'Enter') addTask()
})


// -----------------------------------------------------------------------------------
// clear all tasks button
document.getElementById('clearTaskBtn').addEventListener('click', function () {

    // empty task list
    tasks = []

    // empty completed list
    completedTasks = []

    // refresh screen
    displayTasks()
})


// -----------------------------------------------------------------------------------
// show tasks on screen
function displayTasks() {

    // get active task list area
    let taskList = document.getElementById('taskList')

    // get completed task list area
    let completedList = document.getElementById('completedTaskList')

    // clear both lists before rebuilding
    taskList.innerHTML = ''
    completedList.innerHTML = ''

    // count completed tasks
    let completedCount = 0

    // loop through all tasks
    for (let i = 0; i < tasks.length; i++) {

        // create list item
        let li = document.createElement('li')

        // add styling classes
        li.className = 'list-group-item d-flex justify-content-between align-items-center'

        // create text for task
        let span = document.createElement('span')
        span.textContent = tasks[i]

        // group for buttons (✓ and X)
        let buttonGroup = document.createElement('div')
        buttonGroup.className = 'd-flex align-items-center'

        // button to mark as complete
        let checkBtn = document.createElement('button')
        checkBtn.textContent = '✓'
        checkBtn.className = 'btn btn-sm checkmarkbutton me-1'

        // when check clicked, mark task complete
        checkBtn.addEventListener('click', function (e) {
            e.stopPropagation()
            completedTasks[i] = true
            displayTasks()
        })

        // button to delete task
        let deleteBtn = document.createElement('button')
        deleteBtn.textContent = 'X'
        deleteBtn.className = 'btn btn-sm btn-danger'

        // when delete clicked, remove task, from w3 schools
        deleteBtn.addEventListener('click', function (e) {
            e.stopPropagation()
            tasks.splice(i, 1)
            completedTasks.splice(i, 1)
            displayTasks()
        })

        // put buttons together
        buttonGroup.appendChild(checkBtn)
        buttonGroup.appendChild(deleteBtn)

        // clicking whole task toggles complete status
        li.addEventListener('click', function () {
            completedTasks[i] = !completedTasks[i]
            displayTasks()
        })

        // add text to list item
        li.appendChild(span)

        // if NOT completed, show buttons
        if (!completedTasks[i]) {
            li.appendChild(buttonGroup)
        } else {
            // if completed, only show delete button
            li.appendChild(deleteBtn)
        }

        // if task is completed
        if (completedTasks[i]) {
            li.classList.add('completed') // style it
            completedList.appendChild(li)  // move to completed list
            completedCount++
        } else {
            // otherwise show in active list
            taskList.appendChild(li)
        }
    }

    // update counter text
    document.getElementById('taskCounter').textContent =
        `Active Tasks: ${tasks.length - completedCount} | ⋆•☆•⋆ | Completed Tasks: ${completedCount}`
}


// -----------------------------------------------------------------------------------
// show tasks when page loads
displayTasks()
