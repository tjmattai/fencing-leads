const sgMail = require('@sendgrid/mail');

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
    
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);

    const msg = {
      to: 'tjmattai@gmail.com',
      from: 'marshallmathers1224@gmail.com',
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

    await sgMail.send(msg);
    
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