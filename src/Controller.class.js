class Controller {
  constructor(view, model) {
    this.view = view;
    this.model = model;

    const setActiveNote = (noteIndex) => { this.model.active = noteIndex; };

    const deleteNote = (noteIndex) => {
      this.model.delete(noteIndex);
      // eslint-disable-next-line no-use-before-define
      render();
    };

    const render = () => this.view.loadNotes(
      this.model.notes, this.model.active, setActiveNote, deleteNote,
    );

    // build the app
    this.view.input.addEventListener('keyup', (e) => {
      this.model.update(e.target.value);
      render();
    });

    this.view.newNoteButton.addEventListener('click', () => {
      this.model.create('a new note');
      render();
    });

    this.view.clearCacheButton.addEventListener('click', () => {
      this.model.clearCache();
      render();
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

    render();
  }
}

export default Controller;
