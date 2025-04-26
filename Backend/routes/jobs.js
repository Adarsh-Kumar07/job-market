const express = require('express');
const Job = require('../models/Job');
const router = express.Router();

// Create a Job (employers only)
router.post('/', async (req, res) => {
  const { title, description, location, category, company, employerId } = req.body;
  try {
    const job = await Job.create({ title, description, location, category, company, employerId });
    res.status(201).json(job);
  } catch (err) {
    res.status(400).json({ error: 'Error posting job' });
  }
});

// Optional: Only allow employers to post jobs

// Get all jobs with optional filters
router.get('/', async (req, res) => {
  const { category, location, search } = req.query;
  const filter = {};

  if (category) filter.category = category;
  if (location) filter.location = location;
  if (search) {
    filter.title = { $regex: search, $options: 'i' };
  }

  try {
    const jobs = await Job.find(filter).sort({ createdAt: -1 });
    res.json(jobs);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch jobs' });
  }
});

// Get single job
router.get('/:id', async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    res.json(job);
  } catch {
    res.status(404).json({ error: 'Job not found' });
  }
});

module.exports = router;
