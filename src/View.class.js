class View {
  constructor() {
    this.root = document.getElementById('root');
    this.leftContainer = document.createElement('nav');

    this.newNoteButton = document.createElement('button');
    this.newNoteButton.innerText = 'New Note';

    this.clearCacheButton = document.createElement('button');
    this.clearCacheButton.innerText = 'Clear Saved Notes';

    this.export = document.createElement('button');
    this.export.innerText = 'Export Notes';

    this.exportLink = document.createElement('a');
    this.exportLink.style.display = 'none';
    this.exportLink.download = 'NoteTaker_Export.xls';

    const heading = document.createElement('h1');
    heading.innerText = 'Note Taker';
    const subheading = document.createElement('h2');
    subheading.innerText = 'Saved Notes';

    this.nav = document.createElement('ul');
    this.leftContainer.append(
      heading, this.newNoteButton, this.clearCacheButton,
      this.export, this.exportLink, subheading, this.nav,
    );

    this.notePad = document.createElement('main');

    this.input = document.createElement('textarea');
    this.input.placeholder = 'type notes here...';
    this.input.disabled = true;

    this.notePad.append(this.input);

    // remove the loading state
    this.root.innerHTML = '';

    // append the children
    this.root.append(this.leftContainer, this.notePad);
  }

  loadNotes(notes, active, onClick, onDelete) {
    this.nav.innerHTML = '';
    if (Array.isArray(notes) && notes.length) {
      this.input.disabled = false;
      notes.forEach((note, index) => {
        const li = document.createElement('li');
        this.nav.append(li);

        const selectNoteBtn = document.createElement('button');
        const deleteNoteBtn = document.createElement('button');

        selectNoteBtn.innerText = `${note.substring(0, 15)}${note.length > 15 ? '...' : ''}`;
        deleteNoteBtn.innerText = 'X';

        li.append(selectNoteBtn, deleteNoteBtn);

        if (active === index) {
          this.activeLink = selectNoteBtn;
          selectNoteBtn.classList.toggle('active');
          this.input.value = note;
        }

        selectNoteBtn.addEventListener('click', () => {
          if (this.activeLink === selectNoteBtn) return;

          this.activeLink?.classList.toggle('active');
          this.activeLink = selectNoteBtn;
          selectNoteBtn.classList.toggle('active');
          this.input.value = note;
          this.input.disabled = false;
          onClick(index);
        });

        deleteNoteBtn.addEventListener('click', () => {
          onDelete(index);
        });
      });

      if (active === undefined || active === -1) {
        this.input.disabled = true;
        this.input.value = '';
      }
    } else {
      // there are no notes, display a note to create a note
      this.nav.innerText = 'There are no notes!';
      this.input.disabled = true;
      this.input.value = '';
    }
  }
}

export default View;
