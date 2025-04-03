const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');
const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

app.post('/submit-form', async (req, res) => {
  try {
    const response = await fetch('https://script.google.com/macros/s/AKfycbxDegMyX17A98SpEeYPwWYtDxotW6gn1SLDfZ-V7iaXPciA5Ctav4WrpFlXEQzTlzlZ/exec', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(req.body)
    });

    if (!response.ok) {
      throw new Error('Google Apps Script request failed');
    }

    res.json({ success: true });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
}); 