// array stores all task text
let tasks = []

// array stores completion state (true = completed, false = not completed)
let completedTasks = []


// -----------------------------------------------------------------------------------
// function adds a new task
function addTask() {
    
    // variable gets input box from HTML
    let input = document.getElementById('taskInput')
    
    // variable gets what user typed
    let text = input.value.trim()
    
    // check if input is empty, stop
    if (!text) return
    
    // array action - add task to tasks list
    tasks.push(text)
    
    // array action -  mark task as not completed (false)
    completedTasks.push(false)
    
    // empty the input box
    input.value = ''
    
    // calling the function (refresh the screen)
    displayTasks()
}


// -----------------------------------------------------------------------------------
// event listener - adds a task when Add button is clicked
document.getElementById('addTaskBtn').addEventListener('click', addTask)

// event listener runs function when a key is pressed
document.getElementById('taskInput').addEventListener('keydown', function (e) {

    // check if key pressed is Enter
        if (e.key === 'Enter') addTask()
    })







// -----------------------------------------------------------------------------------
// event listener - runs when clear all tasks button is clicked
document.getElementById('clearTaskBtn').addEventListener('click', function () { 
    // array removes all tasks
    tasks = []
    // array removes all completed tasks
    completedTasks = []
    // calling the function to update screen
    displayTasks()
})







// -----------------------------------------------------------------------------------
// function shows tasks on the page
function displayTasks() {

    // get active task list area in HTML
    let taskList = document.getElementById('taskList')

    // get completed task list area in HTML
    let completedList = document.getElementById('completedTaskList')

    // clear old task lists from the DOM
    taskList.innerHTML = ''
    completedList.innerHTML = ''

    // count completed tasks
    let completedCount = 0
    
    // loop goes through every task in array
    for (let i = 0; i < tasks.length; i++) {

        // html element - creates a new list item
            let li = document.createElement('li')

        // add CSS classes
        li.className = 'list-group-item d-flex justify-content-between align-items-center'

        // html element - text container for task
        let span = document.createElement('span')

        // put task inside list
            span.textContent = tasks[i]

        // html element - create check button
        let checkBtn = document.createElement('button')

        // add checkmark symbol
            checkBtn.textContent = '✓'

        // button appearance
            checkBtn.className = 'btn btn-sm checkmarkbutton'
            
            
            
            
            
        // event listener - when check button is clicked
        checkBtn.addEventListener('click', function (e) {

                // from w3 schools - stops a click from affecting other elements around it
                e.stopPropagation()

                // mark task as completed in state array
                completedTasks[i] = true

                // calling the function to refresh the screen
                displayTasks()
            })





            // event listener - toggles task completion when task row is clicked
            li.addEventListener('click', function () {

                // toggle completion state (true ↔ false)
                completedTasks[i] = !completedTasks[i]

                // call the function to refresh the screen
                displayTasks()
            })





            // add element - put text into list item
            li.appendChild(span)

            // if task is NOT completed, show check button
            if (!completedTasks[i]) {

                // add element show check button
                li.appendChild(checkBtn)
            }





            // if task is completed, style it and move it to completed list
            if (completedTasks[i]) {

                // add class - style completed task
                li.classList.add('completed')

                // move task element to completed list
                completedList.appendChild(li)

                // add to completed total
                completedCount++

            } else {

                // put into active list
                taskList.appendChild(li)
            }
        }





        // output - show number of tasks left and completed
        document.getElementById('taskCounter').textContent =
            `Tasks Left: ${tasks.length - completedCount} | Completed: ${completedCount}`
    }
    
    
    
    
    
    
    
// -----------------------------------------------------------------------------------
// run on page load - display initial task list
displayTasks()
