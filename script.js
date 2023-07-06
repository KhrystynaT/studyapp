function allowDrop(event) {
  event.preventDefault();
}

function drag(event) {
  event.dataTransfer.setData("text", event.target.id);
}

function drop(event, column) {
  event.preventDefault();
  var taskId = event.dataTransfer.getData("text");
  var task = document.getElementById(taskId);
  var columnElement = document.getElementById(column + "-column");
  columnElement.appendChild(task);

  if (column === "current") {
    task.addEventListener("click", function () {
      displayNotesInput(taskId);
    });
  }
}

function addTask() {
  var taskInput = document.getElementById("task-input");
  var task = document.createElement("div");
  var taskId = "task-" + Math.random().toString(36).substr(2, 9);
  task.id = taskId;
  task.className = "task";
  task.draggable = true;
  task.addEventListener("dragstart", drag);
  task.innerHTML = taskInput.value;
  document.getElementById("todo-column").appendChild(task);
  taskInput.value = "";
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
