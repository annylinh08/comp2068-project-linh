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

      res.status(200).json(connections);
  } catch (error) {
    res.status(400).json({message: 'There was an error fetching the posts', error});
  }
};

exports.show = async (req, res) => {
  try {
    const connection = await Connection.findById(req.params.id)
      .populate('user');
      res.status(200).json(connection);
  } catch (error) {
      res.status(400).json({message: "There was an error fetching the post"});
  }
};

exports.new = (req, res) => {
  res.render(`${viewPath}/new`, {
    pageTitle: 'New Item'
  });
};

exports.create = async (req, res) => {
  try {
    const { user: email } = req.session.passport;
    const user = await User.findOne({email: email});
    const connection = await Connection.create({user: user._id, ...req.body});
    res.status(200).json(connection);
  } catch (error) {
    res.status(400).json({message: "There was an error creating the post", error});
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

    res.status(200).json({message: "The post was updated successfully"});
  } catch (error) {
    res.status(400).json({message: "There was an error updating this post"});
  }
};

exports.delete = async (req, res) => {
  try {
    await Connection.deleteOne({_id: req.body.id});
    res.status(200).json({message: "Yay."});
  } catch (error) {
    res.status(400).json({message: "There was an error deleting the post"});
  }
};