require('dotenv').config();
const express = require('express');
const axios = require('axios');
const { Resend } = require('resend');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const resend = new Resend(process.env.RESEND_API_KEY);

// Map your ticket prices (in Kobo, so multiply by 100)
const ticketPrices = {
    "early_bird": 100 * 100,
    "regular": 15000 * 100,
    "vip": 50000 * 100,
    "front_row": 100000 * 100
};

// Endpoint to initialize payment
app.post('/initialize-payment', async (req, res) => {
    const { email, ticketType } = req.body;
    const amount = ticketPrices[ticketType];

    try {
        const response = await axios.post('https://api.paystack.co/transaction/initialize', {
            email,
            amount,
            metadata: { ticketType }
        }, {
            headers: { Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}` }
        });
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Webhook for email confirmation
app.post('/webhook', async (req, res) => {
    const event = req.body;
    if (event.event === 'charge.success') {
        const { email, metadata } = event.data;
        const ticket = metadata.ticketType;

        // Email to Customer
        await resend.emails.send({
            from: 'ComedyShow <onboarding@resend.dev>',
            to: email,
            subject: 'Your Ticket is Confirmed!',
            html: `<p>Success! You have purchased the <b>${ticket}</b> ticket.</p>`
        });

        // Email to Admin
        await resend.emails.send({
            from: 'ComedyShow <onboarding@resend.dev>',
            to: 'your-actual-email@example.com',
            subject: 'New Ticket Sold',
            html: `<p>New sale! Ticket Type: ${ticket}. Customer: ${email}.</p>`
        });
    }
    res.sendStatus(200);
});

app.listen(process.env.PORT || 3000);