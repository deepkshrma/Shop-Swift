const mongoose = require('mongoose');

const siteSettingsSchema = new mongoose.Schema({
  siteName: String,
  logoUrl: String,
  heroText: String,
  heroImage: String,
  aboutImage: String,
  loginImage: String,
  footerPhone: String,
  footerEmail: String,
  footerAddress: String,
  footerCopyright: String,
});

module.exports = mongoose.model('SiteSettings', siteSettingsSchema);
