// INSTRUCTIONS
/*
  Create a new resource model that uses the User
  as an associative collection (examples):
  - User -> Books
  - User -> Reservation

  Your model must contain at least three attributes
  other than the associated user and the timestamps.

  Your model must have at least one helpful virtual
  or query function. For example, you could have a
  book's details output in an easy format: book.format()
*/

const mongoose = require('mongoose');

const ConnectionSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  title: {
    type: String,
    required: true // This must exist
  },
  description: {
    type: String,
    required: true
  },
  category: {
    type: String,
    enum: ['Offer Services', 'Lost and Found', 'Selling Homemade Food', 'Tips Sharing'],
    default: 'Offer Services'
  },
  location: {
    type: String,
    enum: ['Barrie', 'Innisfil', 'Midhurst', 'Edgar', 'Spring Water', 'Angus', 'Churchill', 'Wasaga Beach','Alliston', 'Borden', 'Orillia','Keswick','Cookstown','Elmvale', 'Sutton' ],
    default: 'Barrie'
  },
  price: {
    type: Number,
    required: false
  }
}, {
  timestamps: true,
  toJSON: {
    getters: true
  }
});

ConnectionSchema.query.offerServices = function () {
  return this.where({
    category: 'Offer Services'
  })
};

ConnectionSchema.query.lostAndFound = function () {
  return this.where({
    category: 'Lost and Found'
  })
};


ConnectionSchema.query.sellingHomemadeFood = function () {
  return this.where({
    category: 'Selling Homemade Food'
  })
};

ConnectionSchema.query.tipsSharing = function () {
  return this.where({
    category: 'Tips Sharing'
  })
};

ConnectionSchema.query.innisfil = function () {
  return this.where({
    location: 'Innisfil'
  })
};
ConnectionSchema.query.angus = function () {
  return this.where({
    location: 'Angus'
  })
};
ConnectionSchema.query.borden = function () {
  return this.where({
    location: 'Borden'
  })
};
ConnectionSchema.query.barrie = function () {
  return this.where({
    location: 'Barrie'
  })
};
ConnectionSchema.query.elmvale = function () {
  return this.where({
    location: 'Elmvale'
  })
};
ConnectionSchema.query.sutton = function () {
  return this.where({
    location: 'Sutton'
  })
};
ConnectionSchema.query.alliston = function () {
  return this.where({
    location: 'Alliston'
  })
};
ConnectionSchema.query.wasagaBeach = function () {
  return this.where({
    location: 'Wasaga Beach'
  })
};
ConnectionSchema.query.midhurst = function () {
  return this.where({
    location: 'Midhurst'
  })
};
ConnectionSchema.query.cockstown = function () {
  return this.where({
    location: 'Cockstown'
  })
};
ConnectionSchema.query.edgar = function () {
  return this.where({
    location: 'Edgar'
  })
};
ConnectionSchema.query.churchill = function () {
  return this.where({
    location: 'Churchill'
  })
};
ConnectionSchema.query.keswick = function () {
  return this.where({
    location: 'Keswick'
  })
};
ConnectionSchema.query.springWater = function () {
  return this.where({
    location: 'Spring Water'
  })
};
ConnectionSchema.query.orillia = function () {
  return this.where({
    location: 'Orillia'
  })
};

ConnectionSchema.virtual('synopsis')
.get(function () {
  const post = this.description;
  return post
    .replace(/(<([^>]+)>)/ig,"")
    .substring(0, 400);
});

module.exports = mongoose.model('Connection', ConnectionSchema);