let notelistRootElement = document.querySelector('.noteslist');

document.querySelector('#deleteAllNotes').addEventListener('click', () => {
  document.querySelectorAll('.note').forEach(note => {
    note.remove();
  });
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

  renderNoteList(note);
});

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
    removeElementFromNote(uniqueID);
  });

  noteDiv.appendChild(noteTitle);
  noteDiv.appendChild(noteContent);
  noteDiv.appendChild(noteDeleteButton);

  notelistRootElement.appendChild(noteDiv);

  document.querySelector('#createNoteTitle').value = '';
  document.querySelector('#CreateNoteContent').value = '';
}

function removeElementFromNote(id) {
  document.querySelector('.' + id).remove();
}