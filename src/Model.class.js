class Model {
  constructor() {
    this.KEY = 'NOTES_APP';
    this.notes = ['I\'m a note'];
    this.active = 0;
    const savedData = window.localStorage?.getItem(this.KEY);
    if (savedData) {
      [this.notes, this.active] = JSON.parse(savedData);
    }
  }

  create(note) {
    this.active = this.notes.push(note) - 1;
    this.save();
  }

  update(note) {
    this.notes[this.active] = note;
    this.save();
  }

  delete(index) {
    if (this.notes.length > 1) {
      this.notes.splice(index, 1);
    } else {
      this.notes = [];
    }
    this.active = undefined;
    this.save();
  }

  save() {
    if (window.localStorage) {
      window.localStorage.setItem(this.KEY, JSON.stringify([this.notes, this.active]));
    }
  }

  clearCache() {
    window.localStorage.removeItem(this.KEY);
  }
}

export default Model;
