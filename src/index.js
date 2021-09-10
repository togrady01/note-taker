/* eslint-disable import/extensions */
import View from './View.class.js';
import Controller from './Controller.class.js';
import Model from './Model.class.js';

const app = new Controller(new View(), new Model());

console.log(app);
