const path = require('path');
const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');

const adapter = new FileSync(path.join(__dirname, 'db.json'));
const db = low(adapter);

function init() {
  db.defaults({ feedback: []})
    .write();
}

function addFeedback(name, email, message) {
  db.get('feedback')
    .push({name, email, message})
    .write();
}

module.exports = {
  init,
  addFeedback,
};
