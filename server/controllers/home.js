const storage = require('../storage');

module.exports.get = function(req, res) {
  res.render('index.html');
};


module.exports.post = function (req, res) {
  let name = req.body.name;
  let email = req.body.email;
  let message = req.body.message;
  storage.addFeedback(name, email, message);
  res.send(`You entered ${name}, ${email} and ${message}`);
};
