const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// Enable CORS for all routes (adjust as needed)
app.use(cors());

// eg: GET /proxy?url=https://api.twitter.com/2/tweets/search/recent?query=TSLA&max_results=20
app.get('/proxy', async (req, res) => {
  const targetUrl = req.query.url;
  
  if (!targetUrl) {
    return res.status(400).json({ error: 'Missing target URL parameter' });
  }
  
  try {
    const response = await axios.get(targetUrl, {
      // Optionally, add any headers your target API requires.
      headers: {
        // Replace with your actual Bearer Token
        Authorization: 'Bearer YOUR_TWITTER_BEARER_TOKEN',
      },
    });
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching target URL:', error.message);
    res.status(500).json({ error: 'Error fetching target URL' });
  }
});

app.listen(PORT, () => {
  console.log(`Proxy server listening on port ${PORT}`);
});
