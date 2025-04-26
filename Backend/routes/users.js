const router = require('express').Router();
const User = require('../models/User');
const { verifyRole } = require('../middleware');

const multer = require('multer');
const path = require('path');
const fs = require('fs');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const dir = './uploads/resumes';
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    cb(null, dir);
  },
  filename: (req, file, cb) => {
    cb(null, `${req.user.id}-${Date.now()}${path.extname(file.originalname)}`);
  }
});

const upload = multer({ storage });

router.post('/upload-resume', verifyToken, upload.single('resume'), async (req, res) => {
  const user = await User.findById(req.user.id);
  user.resumePath = req.file.path;
  await user.save();
  res.json({ message: 'Resume uploaded' });
});


router.get('/',verifyRole(['employer']), async (req, res) => {
  const users = await User.find();
  res.json(users);
});

router.delete('/:id',verifyRole(['employer']), async (req, res) => {
  await User.findByIdAndDelete(req.params.id);
  res.json({ message: 'User deleted' });
});

module.exports = router;
