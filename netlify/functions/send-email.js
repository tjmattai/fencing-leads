const nodemailer = require('nodemailer');

exports.handler = async function(event, context) {
  // Set CORS headers
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS'
  };

  // Handle CORS preflight
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers,
      body: ''
    };
  }

  // Only allow POST
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: 'Method Not Allowed' })
    };
  }

  try {
    const data = JSON.parse(event.body);
    
    // Create transporter using Gmail SMTP
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'marshallmathers1224@gmail.com',
        pass: process.env.GMAIL_APP_PASSWORD
      }
    });

    // Email content
    const mailOptions = {
      from: 'marshallmathers1224@gmail.com',
      to: 'tjmattai@gmail.com',
      subject: 'New Lead Form Submission',
      text: `
        New Lead Form Submission:
        Name: ${data.fullName}
        Email: ${data.email}
        Phone: ${data.phone}
        Address: ${data.address}
        Description: ${data.description}
      `
    };

    // Send email
    await transporter.sendMail(mailOptions);
    
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ message: 'Email sent successfully' })
    };
  } catch (error) {
    console.error('Error sending email:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: error.message })
    };
  }
}; 