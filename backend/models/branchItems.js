

const mongoose = require('mongoose');

const branchItemSchema = new mongoose.Schema({
  name: String,
  description: String,
  mapEmbedUrl: String
});


const branchItem = mongoose.model('branches', branchItemSchema, 'branches');
module.exports = branchItem;
