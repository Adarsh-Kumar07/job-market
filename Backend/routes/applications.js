const express = require('express');
const Application = require('../models/Application');
const router = express.Router();
const { verifyToken } = require('../middleware');


// Apply to a job
router.post('/', async (req, res) => {
  const { jobId, applicantId, coverLetter } = req.body;

  try {
    const application = await Application.create({ jobId, applicantId, coverLetter });
    res.status(201).json(application);
  } catch (err) {
    res.status(400).json({ error: 'Could not apply to job' });
  }
});

// Get applications by job seeker
router.get('/user/:id', async (req, res) => {
  try {
    const applications = await Application.find({ applicantId: req.params.id }).populate('jobId');
    res.json(applications);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch applications' });
  }
});

// Get applications by job (for employers)
router.get('/job/:id', async (req, res) => {
  try {
    const applications = await Application.find({ jobId: req.params.id }).populate('applicantId');
    res.json(applications);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch applications' });
  }
});


router.get('/mine', verifyToken, async (req, res) => {
  const apps = await Application.find({ applicantId: req.user.id });
  res.json(apps);
});

module.exports = router;
