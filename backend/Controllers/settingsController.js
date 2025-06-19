const SiteSettings = require('../Models/SiteSettingsModel');

exports.getSettings = async (req, res) => {
    try {
        const settings = await SiteSettings.findOne();
        res.json({ success: true, settings});
    } catch (err) {
        res.status(500).json({ success: false, message: 'Failed to fetch settings'});
    }
};

exports.updateSettings = async (req, res) => {
  let settings = await SiteSettings.findOne();
  if (!settings) settings = new SiteSettings();

  settings.siteName = req.body.siteName;
  settings.heroText = req.body.heroText;
  settings.heroImage = req.body.heroImage;
  settings.loginImage = req.body.loginImage;
  settings.footerEmail = req.body.footerEmail;
  settings.footerAddress = req.body.footerAddress;
  settings.footerPhone = req.body.footerPhone;
  settings.footerCopyright = req.body.footerCopyright;

  if (req.files?.logo) {
    settings.logoUrl = `/images/${req.files.logo[0].filename}`;
  }
  if (req.files?.aboutImage) {
    settings.aboutImage = `/images/${req.files.aboutImage[0].filename}`;
  }
  if (req.files?.heroImage) {
    settings.heroImage = `/images/${req.files.heroImage[0].filename}`;
  }
    if (req.files?.loginImage) {
    settings.loginImage = `/images/${req.files.loginImage[0].filename}`;
  }

  await settings.save();
  res.json({ success: true, message: 'Settings updated.' });
};