require('dotenv').config();
const express = require('express');
const axios = require('axios');
const cors = require('cors');
const { Resend } = require('resend');

const app = express();
app.use(cors()); // In production, replace with your specific URL
app.use(express.json());

const resend = new Resend(process.env.RESEND_API_KEY);

// Endpoint to verify payment
// Add this route to your Express backend
app.post('/verify-payment', async (req, res) => {
    const { reference, name, email, phone, ticket, qty, total } = req.body;

    try {
        // 1. Verify with Paystack (Crucial for security)
        const paystackRes = await axios.get(`https://api.paystack.co/transaction/verify/${reference}`, {
            headers: { Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}` }
        });

        if (paystackRes.data.data.status === 'success') {
            // 2. Send Emails via Resend
            await resend.emails.send({
                from: 'SteveOz <tickets@steveoz.ng>',
                to: email,
                subject: 'Your Ticket Confirmation - I Just Woke Up',
                html: `<h1>Hi ${name},</h1><p>Your purchase of ${qty} ${ticket} ticket(s) is confirmed!</p>`
            });

            await resend.emails.send({
                from: 'System <tickets@steveoz.ng>',
                to: 'Emekaozor1@gmail.com',
                subject: 'New Ticket Sale!',
                html: `<p>New sale from ${name}. Details: ${qty} x ${ticket}, Ref: ${reference}</p>`
            });

            return res.json({ success: true });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});
app.listen(process.env.PORT, () => console.log(`Server running on port ${process.env.PORT}`));