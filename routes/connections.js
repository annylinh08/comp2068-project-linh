const { new: _new, index, show, create, edit, update, delete: _delete } = require('../controllers/ConnectionsController');

function auth (req, res, next) {
  if (!req.isAuthenticated()) {
    req.flash('danger', 'You need to login first.');
    return res.redirect('/login');
  }
  next();
}

module.exports = router => {
  router.get('/connections', index); // public
  router.get('/connections/new', auth, _new); // authenticated
  router.post('/connections', auth, create);  // authenticated
  router.post('/connections/update', auth, update);  // authenticated
  router.post('/connections/delete', auth, _delete);  // authenticated
  router.get('/connections/:id/edit', auth, edit);  // authenticated
  router.get('/connections/:id', show); // public
};