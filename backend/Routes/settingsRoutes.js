const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const { getSettings,updateSettings } = require( '../Controllers/settingsController');
const ensureAuthenticated = require('../Middlewares/Auth');
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'assets/uploads/'),
  filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname),
});
const upload = multer({ storage });
router.get('/', getSettings);
router.put('/', ensureAuthenticated, upload.fields([
  { name: 'logo', maxCount: 1 },
  { name: 'aboutImage', maxCount: 1 },
  { name: 'heroImage', maxCount: 1},
  { name: 'loginImage', maxCount: 1},
]), updateSettings);

module.exports = router;