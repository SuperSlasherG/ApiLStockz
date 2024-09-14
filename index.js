const { createCanvas, loadImage } = require('canvas');
const fetch = require('node-fetch');

module.exports = async (req, res) => {
  const imageUrl = req.query.imageUrl;
  const text = req.query.text || '[50;100]';
  const width = 500;
  const height = 500;

  if (!imageUrl) {
    res.status(400).send('Missing imageUrl parameter');
    return;
  }

  try {
    // Fetch the image
    const response = await fetch(imageUrl);
    if (!response.ok) {
      res.status(response.status).send('Failed to fetch image');
      return;
    }

    const imageBuffer = await response.buffer();
    const image = await loadImage(imageBuffer);

    // Create a canvas with the same size as the image
    const canvas = createCanvas(image.width, image.height);
    const ctx = canvas.getContext('2d');

    // Draw the fetched image onto the canvas
    ctx.drawImage(image, 0, 0);

    // Set text settings
    ctx.font = '40px Arial';
    ctx.fillStyle = 'white';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    // Draw the text
    ctx.fillText(text, image.width / 2, image.height / 2);

    // Send the modified image as a response
    res.setHeader('Content-Type', 'image/png');
    canvas.createPNGStream().pipe(res);
  } catch (error) {
    console.error("Error processing image:", error);
    res.status(500).send("Internal Server Error");
  }
};
