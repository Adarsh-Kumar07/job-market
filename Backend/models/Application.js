const mongoose = require('mongoose');

const ApplicationSchema = new mongoose.Schema({
  jobId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Job',
    required: true
  },
  applicantId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  coverLetter: String,
  status: {
    type: String,
    enum: ['applied', 'reviewed', 'accepted', 'rejected'],
    default: 'applied'
  }
}, { timestamps: true });

module.exports = mongoose.model('Application', ApplicationSchema);
