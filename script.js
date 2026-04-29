// array stores all task text
let tasks = []

// array stores completion state (true = completed, false = not completed)
let completedTasks = []


// -----------------------------------------------------------------------------------
// add new task
function addTask() {

    let input = document.getElementById('taskInput')
    let text = input.value.trim()

    if (!text) return

    tasks.push(text)
    completedTasks.push(false)

    input.value = ''
    input.focus()

    displayTasks()
}


// -----------------------------------------------------------------------------------
// add task button
document.getElementById('addTaskBtn').addEventListener('click', addTask)


// Enter key adds task
document.getElementById('taskInput').addEventListener('keydown', function (e) {
    if (e.key === 'Enter') addTask()
})


// -----------------------------------------------------------------------------------
// clear all tasks
document.getElementById('clearTaskBtn').addEventListener('click', function () {
    tasks = []
    completedTasks = []
    displayTasks()
})


// -----------------------------------------------------------------------------------
// display tasks
function displayTasks() {

    let taskList = document.getElementById('taskList')
    let completedList = document.getElementById('completedTaskList')

    taskList.innerHTML = ''
    completedList.innerHTML = ''

    let completedCount = 0

    for (let i = 0; i < tasks.length; i++) {

        let li = document.createElement('li')
        li.className = 'list-group-item d-flex justify-content-between align-items-center'

        let span = document.createElement('span')
        span.textContent = tasks[i]

        // keep ✓ and ✕ next to each other
        let buttonGroup = document.createElement('div')
        buttonGroup.className = 'd-flex align-items-center'

        // check button (mark complete)
        let checkBtn = document.createElement('button')
        checkBtn.textContent = '✓'
        checkBtn.className = 'btn btn-sm checkmarkbutton me-1'

        checkBtn.addEventListener('click', function (e) {
            e.stopPropagation()
            completedTasks[i] = true
            displayTasks()
        })

        // x button (remove task)
        let deleteBtn = document.createElement('button')
        deleteBtn.textContent = 'X'
        deleteBtn.className = 'btn btn-sm btn-danger'

        deleteBtn.addEventListener('click', function (e) {
            e.stopPropagation()
            tasks.splice(i, 1)
            completedTasks.splice(i, 1)
            displayTasks()
        })

        // add buttons into group
        buttonGroup.appendChild(checkBtn)
        buttonGroup.appendChild(deleteBtn)

        // click task toggles complete
        li.addEventListener('click', function () {
            completedTasks[i] = !completedTasks[i]
            displayTasks()
        })

        li.appendChild(span)

        // only show check if NOT completed
        if (!completedTasks[i]) {
            li.appendChild(buttonGroup)
        } else {
            // if completed, only show delete
            li.appendChild(deleteBtn)
        }

        // completed styling
        if (completedTasks[i]) {
            li.classList.add('completed')
            completedList.appendChild(li)
            completedCount++
        } else {
            taskList.appendChild(li)
        }
    }

    // counter update
    document.getElementById('taskCounter').textContent =
        `Tasks Left: ${tasks.length - completedCount} | Completed: ${completedCount}`
}


// -----------------------------------------------------------------------------------
// refresh to remove all tasks
displayTasks()
