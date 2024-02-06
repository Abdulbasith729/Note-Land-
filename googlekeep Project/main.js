let notelistRootElement = document.querySelector('.noteslist');
let notes = [];

// Load notes from local storage on page load
if (localStorage.getItem('notes')) {
  notes = JSON.parse(localStorage.getItem('notes'));
  renderSavedNotes();
}

document.querySelector('#deleteAllNotes').addEventListener('click', () => {
  notelistRootElement.innerHTML = '';
  notes = [];
  saveNotesToLocalStorage();
});

document.querySelector('#CreateNoteButton').addEventListener('click', () => {
  let note = {
    title: document.querySelector('#createNoteTitle').value,
    content: document.querySelector('#CreateNoteContent').value,
  };

  if (!note.title || !note.content) {
    alert('Both title and content are required to create a note.');
    return;
  }

  notes.push(note);
  renderNoteList(note);
  saveNotesToLocalStorage();
});

function renderSavedNotes() {
  notes.forEach(note => {
    renderNoteList(note);
  });
}

function renderNoteList(note) {
  let uniqueID = 'note' + Math.floor(Math.random() * 1000);

  let noteDiv = document.createElement('div');
  noteDiv.classList.add('note', uniqueID);
  let noteTitle = document.createElement('h4');
  let noteContent = document.createElement('p');
  let noteDeleteButton = document.createElement('button');

  noteTitle.innerText = note.title;
  noteContent.innerText = note.content;
  noteDeleteButton.innerText = 'Delete Note';

  noteDeleteButton.addEventListener('click', () => {
    removeElementFromNoteAndStorage(uniqueID);
  });

  noteDiv.appendChild(noteTitle);
  noteDiv.appendChild(noteContent);
  noteDiv.appendChild(noteDeleteButton);

  notelistRootElement.appendChild(noteDiv);
}

function removeElementFromNoteAndStorage(id) {
  const noteIndex = notes.findIndex(note => note.title === document.querySelector('.' + id + ' h4').innerText);

  if (noteIndex !== -1) {
    notes.splice(noteIndex, 1);
    saveNotesToLocalStorage();
  }

  document.querySelector('.' + id).remove();
}

function saveNotesToLocalStorage() {
  localStorage.setItem('notes', JSON.stringify(notes));
}