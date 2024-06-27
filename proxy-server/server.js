const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();
const port = 3001; // Port the server is listening on

// Middleware setup
app.use(cors()); // Enable CORS
app.use(bodyParser.json()); // Parse incoming JSON requests

// Zapier webhook URL for forwarding data
const webhookUrl = 'https://hooks.zapier.com/hooks/catch/19247203/2b1l071/';

// Endpoint to handle POST requests from the client
app.post('/submit', async (req, res) => {
  try {
    // Forward the POST request data to Zapier webhook
    const response = await axios.post(webhookUrl, req.body, {
      headers: {
        'Content-Type': 'application/json'
      }
    });

    // Respond with the status and data received from Zapier
    res.status(response.status).json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to forward the request to Zapier' });
  }
});

// Start the server and listen on specified port
app.listen(port, () => {
  console.log(`Proxy server listening at http://localhost:${port}`);
});
