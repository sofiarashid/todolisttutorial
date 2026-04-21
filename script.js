let tasks = [] // empty array to store tasks

document.getElementById('addTaskBtn').addEventListener('click', function() {
    //get the value from input field
    let taskInput = document.getElementById('taskInput').value
    //check if input is empty
    if (taskInput) {
    //add new task to task array
        tasks.push(taskInput)
    //clear input field value
        document.getElementById('taskInput').value= ''
    //update task list display
        displayTasks()
    }
})

function displayTasks() {
    // select our tasklist in the html
    let taskList = document.getElementById('taskList')
    // clear the existing html list
    taskList.innerHTML = ''
    //loop through each task in the array and create a list item for each
    tasks.forEach((task, index) => {
        //create <li> element for each task
        let li = document.createElement('li')
        //add styling
        li.classList.add(
            'list-group-item',
            'd-flex',
            'justify-content-between',
            'align-items-center'
        )
        //set inner html of the list item with a task and remove button
        li.innerHTML = `${task} <button class='btn checkmarkbutton btn-sm' onclick='removeTask(${index})'>✓</button>`
        //append the new task list to the html
        taskList.appendChild(li)
    })
}

function removeTask(index) {
    //remove a single task from the array using index
    tasks.splice(index, 1)
    //update task list display
    displayTasks()
}

document.getElementById('clearTaskBtn').addEventListener('click', function() {
    tasks = []
    displayTasks()
})