require('dotenv').config();
const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Create transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD
  }
});

// Email endpoint
app.post('/send-email', async (req, res) => {
  try {
    const { fullName, email, phone, address, description } = req.body;

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: 'tjmattai@gmail.com',
      subject: 'New Lead Form Submission',
      text: `
        New Lead Form Submission:
        Name: ${fullName}
        Email: ${email}
        Phone: ${phone}
        Address: ${address}
        Description: ${description}
      `
    };

    await transporter.sendMail(mailOptions);
    res.json({ success: true, message: 'Email sent successfully' });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

app.listen(port, () => {
  console.log(`Email API running on port ${port}`);
}); 