const mongoose = require('mongoose');

const agentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  avatar: {
    type: String,
    default: '', 
  },
  email: {
    type: String,
    default: '',
  },
  phone: {
    type: String,
    default: '',
  }
}, { timestamps: true });

module.exports = mongoose.model('Agent', agentSchema);
