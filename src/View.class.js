class View {
  constructor() {
    this.root = document.getElementById('root');
    this.leftContainer = document.createElement('nav');

    this.newNoteButton = document.createElement('button');
    this.newNoteButton.innerText = 'New Note';

    this.clearCacheButton = document.createElement('button');
    this.clearCacheButton.innerText = 'Clear Saved Notes';

    const heading = document.createElement('h1');
    heading.innerText = 'Note Taker';
    const subheading = document.createElement('h2');
    subheading.innerText = 'Saved Notes';

    this.nav = document.createElement('ul');
    this.leftContainer.append(
      heading, this.newNoteButton, this.clearCacheButton, subheading, this.nav,
    );

    this.notePad = document.createElement('main');

    this.input = document.createElement('textarea');
    this.input.placeholder = 'type notes here...';

    this.notePad.append(this.input);

    // remove the loading state
    this.root.innerHTML = '';

    // append the children
    this.root.append(this.leftContainer, this.notePad);
  }

  loadNotes(notes, active, onClick) {
    if (Array.isArray(notes) && notes.length) {
      this.nav.innerHTML = '';

      notes.forEach((note, index) => {
        const li = document.createElement('li');
        li.innerText = `${note.substring(0, 15)}${note.length > 15 ? '...' : ''}`;
        this.nav.append(li);

        if (active === index) {
          this.activeLink = li;
          li.classList.toggle('active');
          this.input.value = note;
        }

        li.addEventListener('click', () => {
          if (this.activeLink === li) return;

          this.activeLink?.classList.toggle('active');
          this.activeLink = li;
          li.classList.toggle('active');
          this.input.value = note;
          onClick(index);
        });
      });
    }
  }
}

export default View;
