class Model {
  constructor() {
    this.notes = ['an initial note'];
    this.active = 0;
  }

  create(note) {
    this.active = this.notes.push(note) - 1;
  }

  update(note) {
    this.notes[this.active] = note;
  }

  delete(index) {
    if (this.notes.length > 1) {
      this.notes.splice(index, 1);
    } else {
      this.notes = [];
    }
    this.active = undefined;
  }
}

export default Model;
