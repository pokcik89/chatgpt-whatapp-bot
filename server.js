```js
const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();
app.use(bodyParser.json());

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

app.post('/webhook', async (req, res) => {
  const userMessage = req.body.message.text;
const userPhone = req.body.sender.phone;

  try {
    const gptResponse = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: "gpt-4",
        messages: [{ role: "user", content: userMessage }],
      },
      {
        headers: {
          Authorization: Bearer OPENAI_API_KEY,
        ,
      
    );

    const replyText = gptResponse.data.choices[0].message.content;

    await axios.post(
      'https://api.twilio.com/2010-04-01/Accounts/YOUR_ACCOUNT_SID/Messages.json',
      
        From: 'whatsapp:‪+14155238886‬',
        To: whatsapp:{userPhone},
        Body: replyText,
      },
      {
        auth: {
          username: process.env.TWILIO_SID,
          password: process.env.TWILIO_AUTH_TOKEN,
        },
      }
    );

    res.sendStatus(200);
  } catch (error) {
    console.error('Error:', error);
    res.sendStatus(500);
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(Server berjalan pada port ${PORT});
});
