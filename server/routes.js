const express = require('express');
const router = express.Router();

const mainCtrl = require('./controllers/main');
const loginCtrl = require('./controllers/login');
const adminCtrl = require('./controllers/admin');

const isAdmin = (req, res, next) => {
  if (req.session.isAdmin) return next();
  res.redirect('/login');
};

router.get('/', mainCtrl.get);
router.post('/', mainCtrl.post);
router.get('/login', loginCtrl.get);
router.post('/login', loginCtrl.post);
router.get('/admin', isAdmin, adminCtrl.get);
router.post('/admin/skills', isAdmin, adminCtrl.postSkills);
router.post('/admin/upload', isAdmin, adminCtrl.postProduct);

module.exports = router;
