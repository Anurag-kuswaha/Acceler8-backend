const express = require('express');
const router = express.Router();
const resumeController = require('../controllers/ResumeController');

router.post('/uploadResumeDetails', resumeController.uploadResumeDetails);
router.get('/getResumeById/:id', resumeController.getResumeById);
router.get('/getResumeByName/:name', resumeController.getResumeByName);

module.exports = router;