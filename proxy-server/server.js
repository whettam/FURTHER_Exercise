const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();
const port = 3001; // You can change this port if needed

app.use(cors());
app.use(bodyParser.json());

const webhookUrl = 'https://hooks.zapier.com/hooks/catch/19247203/2b1l071/';

app.post('/submit', async (req, res) => {
  try {
    const response = await axios.post(webhookUrl, req.body, {
      headers: {
        'Content-Type': 'application/json'
      }
    });

    res.status(response.status).json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to forward the request to Zapier' });
  }
});

app.listen(port, () => {
  console.log(`Proxy server listening at http://localhost:${port}`);
});
