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

    this.view.loadNotes(
      this.model.notes, this.model.active, setActiveNote, (i) => this.model.delete(i),
    );
  }
}

export default Controller;
