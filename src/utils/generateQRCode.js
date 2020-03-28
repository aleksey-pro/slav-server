const QRCode = require('qrcode');
const path = require('path');

const options = {
    //   dark: '#00F', // Blue modules
    //   light: '#0000' // Transparent background
};

const generateQRCode = async (id, name) => {
  // where to save
  const imgPath = `${path.join('src', 'qrimages')}/${name}.png`;
  const fullUrl = `${process.env.APP_URL}/api/v1/register/${id}`;
  await QRCode.toFile(imgPath, fullUrl, options, function (err) {
    if (err) throw err
    console.log('saved.')
  })
};

module.exports = generateQRCode;
