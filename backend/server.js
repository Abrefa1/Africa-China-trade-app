// server.js
import express from 'express';
import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();
const app = express();
app.use(express.json());

// Approve payment
app.post('/payments/approve', async (req, res) => {
  const { paymentId } = req.body;
  try {
    const response = await axios.post(
      `https://api.minepi.com/v2/payments/${paymentId}/approve`,
      {},
      {
        headers: {
          Authorization: `Key ${process.env.PI_API_KEY}`,
        },
      }
    );
    res.json({ status: 'approved', data: response.data });
  } catch (err) {
    console.error(err.response?.data || err.message);
    res.status(500).json({ error: 'Payment approval failed' });
  }
});

// Complete payment
app.post('/payments/complete', async (req, res) => {
  const { paymentId, txid } = req.body;
  try {
    const response = await axios.post(
      `https://api.minepi.com/v2/payments/${paymentId}/complete`,
      { txid },
      {
        headers: {
          Authorization: `Key ${process.env.PI_API_KEY}`,
        },
      }
    );
    res.json({ status: 'completed', data: response.data });
  } catch (err) {
    console.error(err.response?.data || err.message);
    res.status(500).json({ error: 'Payment completion failed' });
  }
});

app.listen(3000, () => console.log('Server running on port 3000'));
