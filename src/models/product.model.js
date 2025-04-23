const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  stt: {
    type: Number,
    required: true,
  },
  code: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  industry: {
    type: String,
    default: '',
  },
  status: {
    type: String,
    enum: ['Đang triển khai', 'Chưa triển khai', 'Không được triển khai'],
    default: 'Chưa triển khai',
  },
  agentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Agent',
  },
  company: {
    type: String,
    default: '',
  },
  hospitalId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Hospital',
    required: true,
  },
});

module.exports = mongoose.model('Product', productSchema);
