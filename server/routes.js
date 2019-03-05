const Router = require('koa-router');
const storage = require('./model/storage');
const koaBody = require('koa-body');

const router = new Router();

const mainCtrl = require('./controllers/main');
const loginCtrl = require('./controllers/login');
const adminCtrl = require('./controllers/admin');

router.get('/', mainCtrl.get);
router.post('/', mainCtrl.post);
router.get('/login', loginCtrl.get);
router.post('/login', loginCtrl.post);
router.get('/admin', adminCtrl.get);
router.post('/admin/skills', adminCtrl.postSkills);

router.post(
  '/admin/upload',
  koaBody({
    multipart: true,
    formidable: {
      uploadDir: process.cwd() + '/public/upload',
    },
  }),
  adminCtrl.postProduct
);

module.exports = router;
