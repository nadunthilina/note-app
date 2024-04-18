const notecon = document.querySelector(".note-con");
const createBtn = document.querySelector(".btn");

function updateStorage() {
    const notes = document.querySelectorAll(".input-box");
    let notesData = "";
    notes.forEach(note => {
        notesData += note.innerHTML + "|";
    });
    localStorage.setItem("notes", notesData);
}

function loadNotes() {
    const notesData = localStorage.getItem("notes");
    if (notesData) {
        const notesArray = notesData.split("|");
        notesArray.forEach(note => {
            createNoteElement(note);
        });
    }
}

function createNoteElement(noteText) {
    const noteDiv = document.createElement("div");
    noteDiv.className = "note";
    const inputBox = document.createElement("p");
    inputBox.className = "input-box";
    inputBox.setAttribute("contenteditable", "true");
    inputBox.innerHTML = noteText;
    const deleteButton = document.createElement("button");
    deleteButton.className = "delete-btn";
    deleteButton.innerHTML = "<img src='delete.png' alt='Delete'>";
    deleteButton.addEventListener("click", () => {
        noteDiv.remove();
        updateStorage();
    });
    noteDiv.appendChild(inputBox);
    noteDiv.appendChild(deleteButton);
    notecon.appendChild(noteDiv);
}

createBtn.addEventListener("click", () => {
    createNoteElement("");
});

document.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        document.execCommand("insertLineBreak");
        event.preventDefault();
    }
});

window.addEventListener("DOMContentLoaded", () => {
    loadNotes();
});
