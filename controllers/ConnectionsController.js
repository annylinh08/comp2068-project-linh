// INSTRUCTIONS:
/*
  Create a new resource controller that uses the
  User as an associative collection (examples):
  - User -> Books
  - User -> Reservation

  The resource controller must contain the 7 resource actions:
  - index
  - show
  - new
  - create
  - edit
  - update
  - delete
*/

const viewPath = 'connections';
const Connection = require('../models/Connection');
const User = require('../models/User');

exports.index = async (req, res) => {
  try {
    const connections = await Connection
      .find()
      .populate('user')
      .sort({updatedAt: 'desc'});

    res.render(`${viewPath}/index`, {
      pageTitle: 'Connex Page',
      connections: connections
    });
  } catch (error) {
    req.flash('danger', `There was an error displaying the Connex Page: ${error}`);
    res.redirect('/');
  }
};

exports.show = async (req, res) => {
  try {
    const connection = await Connection.findById(req.params.id)
      .populate('user');
    console.log(connection);
    res.render(`${viewPath}/show`, {
      pageTitle: connection.title,
      connection: connection
    });
  } catch (error) {
    req.flash('danger', `There was an error displaying this item: ${error}`);
    res.redirect('/');
  }
};

exports.new = (req, res) => {
  res.render(`${viewPath}/new`, {
    pageTitle: 'New Item'
  });
};

exports.create = async (req, res) => {
  try {
    console.log(req.session.passport);
    const { user: email } = req.session.passport;
    const user = await User.findOne({email: email});
    console.log('User', user);
    const connection = await Connection.create({user: user._id, ...req.body});

    req.flash('success', 'Item created successfully');
    res.redirect(`/connections/${connection.id}`);
  } catch (error) {
    req.flash('danger', `There was an error creating this item: ${error}`);
    req.session.formData = req.body;
    res.redirect('/connections/new');
  }
};

exports.edit = async (req, res) => {
  try {
    const connection = await Connection.findById(req.params.id);
    res.render(`${viewPath}/edit`, {
      pageTitle: connection.title,
      formData: connection
    });
  } catch (error) {
    req.flash('danger', `There was an error accessing this item: ${error}`);
    res.redirect('/');
  }
};

exports.update = async (req, res) => {
  try {
    const { user: email } = req.session.passport;
    const user = await User.findOne({email: email});

    let connection = await Connection.findById(req.body.id);
    if (!connection) throw new Error('Item could not be found');

    const attributes = {user: user._id, ...req.body};
    await Connection.validate(attributes);
    await Connection.findByIdAndUpdate(attributes.id, attributes);

    req.flash('success', 'The item was updated successfully');
    res.redirect(`/connections/${req.body.id}`);
  } catch (error) {
    req.flash('danger', `There was an error updating this item: ${error}`);
    res.redirect(`/connections/${req.body.id}/edit`);
  }
};

exports.delete = async (req, res) => {
  try {
    console.log(req.body);
    await Connection.deleteOne({_id: req.body.id});
    req.flash('success', 'The item was deleted successfully');
    res.redirect(`/connections`);
  } catch (error) {
    req.flash('danger', `There was an error deleting this item: ${error}`);
    res.redirect(`/connections`);
  }
};