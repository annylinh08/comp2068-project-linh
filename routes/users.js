const { new: _new, create  } = require('../controllers/UsersController');

module.exports = router => {
  router.get('/register', _new);
  router.post('/Users', create);
  // Step 1: Setup the necessary routes for new and create
};