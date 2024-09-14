const { createCanvas } = require('canvas');

module.exports = (req, res) => {
  const text = req.query.text || '[50;100]';
  const width = 500;
  const height = 500;

  const canvas = createCanvas(width, height);
  const ctx = canvas.getContext('2d');

  // Set background color
  ctx.fillStyle = '#000';
  ctx.fillRect(0, 0, width, height);

  // Set text settings
  ctx.font = '40px Arial';
  ctx.fillStyle = 'white';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';

  // Draw text in the center
  ctx.fillText(text, width / 2, height / 2);

  // Send the image as a response
  res.setHeader('Content-Type', 'image/png');
  canvas.createPNGStream().pipe(res);
};
