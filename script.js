function allowDrop(event) {
  event.preventDefault();
}

function drag(event) {
  var taskId = event.target.id;
  var task = document.getElementById(taskId);

  // Remove the "Add Notes" input field and button
  var notesInput = task.querySelector("input");
  var addNotesButton = task.querySelector("button");
  if (notesInput) {
    notesInput.remove();
  }
  if (addNotesButton) {
    addNotesButton.remove();
  }

  event.dataTransfer.setData("text", taskId);
  event.dataTransfer.setDragImage(task, 0, 0);
}
function drop(event, column) {
  event.preventDefault();
  var taskId = event.dataTransfer.getData("text");
  var task = document.getElementById(taskId);
  var columnElement = document.getElementById(column + "-column");

  if (column === "current") {
    // Reattach the "Add Notes" input field and button
    var notesInput = task.querySelector("input");
    var addNotesButton = task.querySelector("button");
    if (notesInput && addNotesButton) {
      task.removeChild(notesInput);
      task.removeChild(addNotesButton);
    }

    task.addEventListener("click", function () {
      displayNotesInput(taskId);
    });
  } else if (column === "completed") {
    // Remove the "Add Notes" button from the task
    var addNotesButton = task.querySelector("button");
    if (addNotesButton) {
      addNotesButton.remove();
    }
  }

  // Remove all existing notes
  var notesElements = task.querySelectorAll("p");
  notesElements.forEach(function (notesElement) {
    task.removeChild(notesElement);
  });

  columnElement.appendChild(task);
}

function addTask() {
  var taskInput = document.getElementById("task-input");
  var task = document.createElement("div");
  var taskId = "task-" + Math.random().toString(36).substr(2, 9);
  task.id = taskId;
  task.className = "task";
  task.draggable = true;
  task.addEventListener("dragstart", drag);

  var taskContent = document.createElement("span");
  taskContent.innerHTML = taskInput.value;

  var editButton = document.createElement("button");
  editButton.innerHTML = "Edit";
  editButton.onclick = function () {
    editTask(taskId);
  };

  var deleteButton = document.createElement("button");
  deleteButton.innerHTML = "Delete";
  deleteButton.onclick = function () {
    deleteTask(taskId);
  };

  task.appendChild(taskContent);
  task.appendChild(editButton);
  task.appendChild(deleteButton);

  document.getElementById("todo-column").appendChild(task);
  taskInput.value = "";
}

// Handle Enter key press in task input field
document
  .getElementById("task-input")
  .addEventListener("keyup", function (event) {
    if (event.keyCode === 13) {
      event.preventDefault();
      addTask();
    }
  });

function editTask(taskId) {
  var task = document.getElementById(taskId);
  var taskContent = task.firstChild;

  var newTaskName = prompt(
    "Enter a new name for the task:",
    taskContent.innerHTML
  );

  if (newTaskName) {
    taskContent.innerHTML = newTaskName;
  }
}

function deleteTask(taskId) {
  var task = document.getElementById(taskId);
  task.remove();
}

function displayNotesInput(taskId) {
  var task = document.getElementById(taskId);

  // Check if notes input field already exists
  var existingNotesInput = document.getElementById("notes-input-" + taskId);
  if (existingNotesInput) {
    existingNotesInput.style.display = "block";
    return;
  }

  var notesInput = document.createElement("input");
  notesInput.type = "text";
  notesInput.id = "notes-input-" + taskId;
  notesInput.placeholder = "Enter notes";

  var addNotesButton = document.createElement("button");
  addNotesButton.innerHTML = "Add";
  addNotesButton.onclick = function () {
    addNotes(taskId);
  };

  task.appendChild(notesInput);
  task.appendChild(addNotesButton);
}

function addNotes(taskId) {
  var notesInput = document.getElementById("notes-input-" + taskId);
  var notes = notesInput.value;

  var task = document.getElementById(taskId);
  var notesElement = document.createElement("p");
  notesElement.innerHTML = "Notes: " + notes;

  task.appendChild(notesElement);

  // Hide the notes input field and button
  notesInput.style.display = "none";
  notesInput.value = "";
  notesInput.previousSibling.style.display = "none";
}

function editNotes(taskId, notesElement) {
  var newNotes = prompt(
    "Edit notes:",
    notesElement.innerHTML.replace("Notes: ", "")
  );

  if (newNotes) {
    notesElement.innerHTML = "Notes: " + newNotes;
  }
}

function deleteNotes(taskId, notesElement) {
  notesElement.remove();
}

// Handle Enter key press in notes input field
document.addEventListener("keyup", function (event) {
  if (event.keyCode === 13 && event.target.tagName === "INPUT") {
    var taskId = event.target.id.split("-")[2];
    addNotes(taskId);
  }
});
