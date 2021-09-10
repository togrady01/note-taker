class Controller {
  constructor(view, model) {
    this.view = view;
    this.model = model;

    const setActiveNote = (noteIndex) => { this.model.active = noteIndex; };

    // build the app
    this.view.input.addEventListener('keyup', (e) => {
      this.model.update(e.target.value);
      this.view.loadNotes(
        this.model.notes, this.model.active, setActiveNote, (i) => this.model.delete(i),
      );
    });

    this.view.newNoteButton.addEventListener('click', () => {
      this.model.create('a new note');
      this.view.loadNotes(
        this.model.notes, this.model.active, setActiveNote, (i) => this.model.delete(i),
      );
    });

    this.view.clearCacheButton.addEventListener('click', () => {
      this.model.clearCache();
    });

    this.view.export.addEventListener('click', () => {
      const { notes } = this.model;
      if (notes.length) {
        const formattedText = notes.map((note, index) => `${index + 1}\t${note}\n`).join('').replace(/ /g, '%20');
        this.view.exportLink.href = `data:application/vnd.ms-excel,ID\tNote\n${formattedText}`;
        this.view.exportLink.click();
        this.view.exportLink.href = '';
      }
    });

    this.view.loadNotes(
      this.model.notes, this.model.active, setActiveNote, (i) => this.model.delete(i),
    );
  }
}

export default Controller;
