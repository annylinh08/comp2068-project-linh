const { new: _new, create  } = require('../controllers/UsersController');

module.exports = router => {
  router.get('/users/new', _new);
  router.post('/users', create);
  // Step 1: Setup the necessary routes for new and create
};