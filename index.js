const { createCanvas, loadImage } = require('canvas');
const fetch = require('node-fetch');

module.exports = async (req, res) => {
  const imageUrl = req.query.imageUrl;
  const number = req.query.number || '10'; // The number to place on the image
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
    ctx.font = '50px Arial'; // Adjust font size as needed
    ctx.fillStyle = 'black'; // Color of the number
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    // Draw the number in the left circled area
    // You might need to adjust the x and y coordinates for your specific image
    const leftX = 100;  // X-coordinate for left number
    const leftY = image.height / 2 + 50;  // Y-coordinate for left number
    ctx.fillText(123, leftX, leftY);

    // Draw the number in the right circled area
    const rightX = image.width - 100;  // X-coordinate for right number
    const rightY = image.height / 2 + 50;  // Y-coordinate for right number
    ctx.fillText(123, rightX, rightY);

    // Send the modified image as a response
    res.setHeader('Content-Type', 'image/png');
    canvas.createPNGStream().pipe(res);
  } catch (error) {
    console.error("Error processing image:", error);
    res.status(500).send("Internal Server Error");
  }
};
