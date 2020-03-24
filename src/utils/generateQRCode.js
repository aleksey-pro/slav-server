const QRCode = require('qrcode');
const path = require('path');

const options = {
    //   dark: '#00F', // Blue modules
    //   light: '#0000' // Transparent background
};

const generateQRCode = async (id, name) => {
  const imgPath = `${path.join('src', 'QRImages')}/${name}.png`;
  const fullUrl = `http://www.xn--80aaf8admgsd3i.xn--p1acf/api/v1/register/${id}`;
  await QRCode.toFile(imgPath, fullUrl, options, function (err) {
    if (err) throw err
    console.log('saved.')
  })
};

module.exports = generateQRCode;
