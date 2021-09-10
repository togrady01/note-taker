class Model {
  constructor() {
    this.KEY = 'NOTE_TAKER';
    this.notes = [];
    this.active = -1;
    const savedData = window.localStorage?.getItem(this.KEY);
    if (savedData) {
      [this.notes, this.active] = JSON.parse(savedData);
    }
    this.delete = this.delete.bind(this);
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
    if (this.active === index) {
      this.active = undefined;
    } else if (index < this.active) {
      this.active -= 1;
    }
    this.save();
  }

  save() {
    if (window.localStorage) {
      window.localStorage.setItem(this.KEY, JSON.stringify([this.notes, this.active]));
    }
  }

  clearCache() {
    window.localStorage.removeItem(this.KEY);
    this.notes = [];
    this.active = -1;
  }
}

export default Model;
