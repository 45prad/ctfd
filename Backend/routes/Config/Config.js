const express = require('express');
const router = express.Router();
const path = require('path');
const fs = require('fs');
const Config=require('../../models/CTFdChallenges/Config');


const createUploadMiddleware = require('../../utils/CTFdChallenges/multerConfig');
// Define the upload path
const uploadPath = path.join(__dirname, '../../uploads/CTFdChallenges');

// Create multer upload middleware with dynamic path
const upload = createUploadMiddleware(uploadPath);


router.post('/update-general', async (req, res) => {
  try {
    const { title, description } = req.body;

    // Assuming you want to update the existing config or create a new one if not exists
    const config = await Config.findOne();
    if (config) {
      config.title = title;
      config.description=description;
      await config.save();
    } else {
      const newConfig = new Config({ title, description });
      await newConfig.save();
    }

    res.status(200).json({ success: true, message: 'Title and discription updated successfully!' });
  } catch (error) {
    console.error('Error updating title and discription :', error);
    res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
});


router.post('/update-logo', upload.single('logo'), async (req, res) => {
  try {
    const url = req.file ? `/uploads/CTFdChallenges/${req.file.filename}` : null;

    // Assuming you want to update the existing config or create a new one if not exists
    const config = await Config.findOne();
    if (config) {
      config.url = url;
      await config.save();
    } else {
      const newConfig = new Config({ url });
      await newConfig.save();
    }

    res.status(200).json({ success: true, message: 'Logo updated successfully!' });
  } catch (error) {
    console.error('Error updating logo:', error);
    res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
});


router.get('/eventDetails', async (req, res) => {
  try {
    // Find the most recent logo entry
    const eventDetails = await Config.findOne();

    if (eventDetails) {
      res.json({
        url: eventDetails.url,
        title: eventDetails.title,
        description: eventDetails.description
      });
    } else {
      res.status(404).json({ message: 'eventDetails not found' });
    }
  } catch (error) {
    console.error('Error fetching eventDetails:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// router.get('/getVisibilitySettings', async (req, res) => {
//   try {
//       const config = await Config.findOne();
//       res.json({ settings: config.visibilitySettings });
//   } catch (error) {
//       res.status(500).json({ message: 'Error fetching visibility settings' });
//   }
// });

// router.post('/setVisibilitySettings', async (req, res) => {
//   const { section, visibility } = req.body;
//   try {
//       const config = await Config.findOne();
//       config.visibilitySettings[section] = visibility;
//       await config.save();
//       res.status(200).json({ message: 'Visibility setting updated' });
//   } catch (error) {
//       res.status(500).json({ message: 'Error updating visibility setting' });
//   }
// });


// Get visibility settings for a specific team
router.get('/getVisibilitySettings/:team', async (req, res) => {
  const { team } = req.params;
  try {
      const config = await Config.findOne();
      if (!config || !config.visibilitySettings[team]) {
          return res.status(404).json({ message: 'Team not found or visibility settings not configured.' });
      }
      res.json({ settings: config.visibilitySettings[team] });
  } catch (error) {
      res.status(500).json({ message: 'Error fetching visibility settings' });
  }
});

// Update visibility settings for a specific team and section
router.post('/setVisibilitySettings', async (req, res) => {
  const { team, section, visibility } = req.body;
  try {
      const config = await Config.findOne();
      if (!config || !config.visibilitySettings[team]) {
          return res.status(404).json({ message: 'Team not found or visibility settings not configured.' });
      }
      config.visibilitySettings[team][section] = visibility;
      await config.save();
      res.status(200).json({ message: 'Visibility setting updated' });
  } catch (error) {
      res.status(500).json({ message: 'Error updating visibility setting' });
  }
});


module.exports = router;