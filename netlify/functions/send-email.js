const { google } = require('googleapis');

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
    
    // Create Gmail API client
    const auth = new google.auth.GoogleAuth({
      credentials: JSON.parse(process.env.GOOGLE_CREDENTIALS),
      scopes: ['https://www.googleapis.com/auth/gmail.send']
    });

    const gmail = google.gmail({ version: 'v1', auth });

    // Create email message
    const email = [
      'From: marshallmathers1224@gmail.com',
      'To: tjmattai@gmail.com',
      'Subject: New Lead Form Submission',
      'Content-Type: text/plain; charset=utf-8',
      '',
      `New Lead Form Submission:
      Name: ${data.fullName}
      Email: ${data.email}
      Phone: ${data.phone}
      Address: ${data.address}
      Description: ${data.description}`
    ].join('\n');

    // Send email
    await gmail.users.messages.send({
      userId: 'me',
      requestBody: {
        raw: Buffer.from(email).toString('base64')
      }
    });
    
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