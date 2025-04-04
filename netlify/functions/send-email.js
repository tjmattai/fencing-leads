const nodemailer = require('nodemailer');

exports.handler = async function(event, context) {
  console.log('Function started');
  
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
    console.log('Parsing request body');
    const data = JSON.parse(event.body);
    console.log('Request data:', data);
    
    console.log('Creating transporter');
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false,
      auth: {
        user: 'marshallmathers1224@gmail.com',
        pass: process.env.GMAIL_APP_PASSWORD
      }
    });

    console.log('Setting up email options');
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

    console.log('Attempting to send email');
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent successfully:', info);
    
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ message: 'Email sent successfully' })
    };
  } catch (error) {
    console.error('Detailed error:', {
      message: error.message,
      stack: error.stack,
      code: error.code,
      response: error.response
    });
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ 
        error: error.message,
        details: error.stack
      })
    };
  }
}; 