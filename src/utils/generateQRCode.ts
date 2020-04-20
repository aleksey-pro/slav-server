import * as QRCode  from 'qrcode';
import path from 'path';

export const generateQRCode = (id: string, name: string) => {
  // where to save
  const imgPath = `${path.join('src', 'qrimages')}/${name}.png`;
  const fullUrl = `${process.env.APP_URL}/api/v1/register/${id}`;
  QRCode.toFile(imgPath, fullUrl, function (err: Error) {
    if (err) throw err
    console.log('saved.')
  })
};