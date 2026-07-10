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
// --- UPDATE YOUR /verify-payment ROUTE IN index.js ON RENDER ---



app.get('/ping', (req, res) => {
    res.send('Pong! The server is awake.');
});

function generateTicketHtml(name, qty, ticket, reference, total) {
    const eventDate = 'Sunday, 12th July 2026';
    // ... insert the full HTML string I provided in your previous message here ...
    // Make sure to use the template literals: ${name}, ${qty}, ${ticket}, etc.
    return `  <!DOCTYPE html>
            <html>
            <body style="margin: 0; padding: 0; background-color: #f4f7f6; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;">
                <table width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color: #f4f7f6; padding: 20px 0;">
                    <tr>
                        <td align="center">
                            <table width="600" border="0" cellspacing="0" cellpadding="0" style="background-color: #1a1e2a; border-radius: 12px; overflow: hidden; box-shadow: 0 10px 30px rgba(0,0,0,0.4); margin: 0 auto; max-width: 600px;">
                                
                                <tr>
                                    <td align="center" style="background: linear-gradient(135deg, #1d2537 0%, #303e56 100%); padding: 30px;">
                                        <p style="margin: 0; font-size: 11px; color: #a1b0c9; letter-spacing: 2px; text-transform: uppercase;">AMICO RECORDS PRESENTS</p>
                                        <h1 style="margin: 5px 0 15px 0; font-size: 64px; color: #ffffff; letter-spacing: -2px; font-weight: 800; text-transform: uppercase;">STEVEOZ</h1>
                                        
                                        <table border="0" cellspacing="0" cellpadding="0" align="center">
                                            <tr>
                                                <td style="background-color: #102e1c; color: #87ff70; padding: 6px 12px; font-weight: bold; border-radius: 4px; font-size: 20px;">I</td>
                                                <td width="5"></td>
                                                <td style="background-color: #1c102e; color: #b087ff; padding: 6px 12px; font-weight: bold; border-radius: 4px; font-size: 20px;">JUST</td>
                                                <td width="5"></td>
                                                <td style="background-color: #2e2810; color: #ffeb87; padding: 6px 12px; font-weight: bold; border-radius: 4px; font-size: 20px;">WO</td>
                                                <td width="5"></td>
                                                <td style="background-color: #2e1010; color: #ff8787; padding: 6px 12px; font-weight: bold; border-radius: 4px; font-size: 20px;">K</td>
                                                <td width="5"></td>
                                                <td style="background-color: #101c2e; color: #87c3ff; padding: 6px 12px; font-weight: bold; border-radius: 4px; font-size: 20px;">E</td>
                                                <td width="5"></td>
                                                <td style="background-color: #2e2e2e; color: #ffebcc; padding: 6px 12px; font-weight: bold; border-radius: 4px; font-size: 20px;">UP</td>
                                            </tr>
                                        </table>
                                        <div style="display: inline-block; background-color: #e63329; color: #ffffff; padding: 4px 14px; border-radius: 10px; font-size: 11px; font-weight: bold; text-transform: uppercase; margin-top: 15px;">A Comedy Special</div>
                                    </td>
                                </tr>

                                <tr>
                                    <td style="padding: 40px; color: #c4d1e6;">
                                        <h2 style="color: #ffffff; font-size: 24px; margin-top: 0;">Hi ${name}, Your Ticket is Confirmed!</h2>
                                        <p style="font-size: 16px; line-height: 1.6; color: #a1b0c9;">Get ready for an unforgettable night! Your purchase of ${qty}× ${ticket} ticket(s) has been successfully verified.</p>
                                        <p style="font-size: 14px; color: #a1b0c9;">Please present this email at the gate along with a valid ID.</p>
                                        
                                        <div style="height: 1px; background-color: #313a4f; margin: 30px 0;"></div>
                                        
                                        <table width="100%" border="0" cellspacing="0" cellpadding="0">
                                            <tr>
                                                <td width="48%" valign="top" style="padding-bottom: 25px;">
                                                    <p style="margin: 0; font-size: 11px; color: #a1b0c9; text-transform: uppercase; letter-spacing: 1px;">DATE</p>
                                                    <p style="margin: 5px 0 0 0; font-size: 16px; color: #ffffff; font-weight: bold;">${eventDate}</p>
                                                    <p style="margin: 2px 0 0 0; font-size: 14px; color: #a1b0c9;">Doors: 4:00 PM | Start: 5:00 PM</p>
                                                </td>
                                                <td width="4%"></td>
                                                <td width="48%" valign="top">
                                                    <p style="margin: 0; font-size: 11px; color: #a1b0c9; text-transform: uppercase; letter-spacing: 1px;">VENUE</p>
                                                    <p style="margin: 5px 0 0 0; font-size: 16px; color: #ffffff; font-weight: bold; line-height: 1.3;">Mike Adenuga Centre</p>
                                                    <p style="margin: 2px 0 0 0; font-size: 13px; color: #a1b0c9;">9 Osborne Road, Ikoyi, Lagos</p>
                                                </td>
                                            </tr>
                                        </table>

                                        <div style="height: 1px; background-color: #313a4f; margin: 10px 0 30px 0;"></div>

                                        <table width="100%" border="0" cellspacing="0" cellpadding="15" style="background-color: #141721; border-radius: 8px;">
                                            <tr>
                                                <td style="color: #a1b0c9; font-size: 13px;">TICKET TYPE</td>
                                                <td style="color: #ffffff; font-size: 14px; font-weight: bold; text-align: right;">${ticket}</td>
                                            </tr>
                                            <tr>
                                                <td style="color: #a1b0c9; font-size: 13px;">QUANTITY</td>
                                                <td style="color: #ffffff; font-size: 14px; font-weight: bold; text-align: right;">${qty}</td>
                                            </tr>
                                            <tr>
                                                <td style="color: #a1b0c9; font-size: 13px;">TOTAL PAID</td>
                                                <td style="color: #ffffff; font-size: 18px; font-weight: bold; text-align: right; border-top: 1px solid #313a4f; padding-top: 20px;">₦${total.toLocaleString()}</td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>

                                <tr>
                                    <td align="center" style="background-color: #1d2537; padding: 25px 40px; border-top: 1px solid #313a4f;">
                                        <p style="margin: 0; font-size: 11px; color: #a1b0c9; text-transform: uppercase;">Ticket Reference</p>
                                        <p style="margin: 5px 0 0 0; font-size: 15px; color: #ffffff; font-weight: bold;">${reference}</p>
                                        
                                        <div style="height: 1px; background-color: #313a4f; margin: 15px 0;"></div>
                                        
                                        <p style="margin: 0; font-size: 12px; color: #a1b0c9;">Questions? Contact us: <a href="mailto:tickets@steveoz.ng" style="color: #87c3ff; text-decoration: none;">tickets@steveoz.ng</a></p>
                                        <p style="margin: 10px 0 0 0; font-size: 10px; color: #a1b0c9;">Event hosted by Amico Records.</p>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                </table>
            </body>
            </html>
          
    `;
}


app.post('/admin-bulk-send', async (req, res) => {
    if (req.headers['authorization'] !== process.env.ADMIN_SECRET) {
        return res.status(401).json({ error: "Unauthorized" });
    }

    const { customers } = req.body;
    const results = { sent: [], failed: [] };

    for (const customer of customers) {
        try {
            // Use the same function that your main payment route uses
            const htmlContent = generateTicketHtml(
                customer.name, 
                customer.qty, 
                customer.ticket, 
                customer.ref, 
                customer.total
            );

            await resend.emails.send({
                from: 'SteveOz - I Just Woke Up <tickets@steveoz.ng>',
                to: customer.email,
                subject: 'Your E-Ticket Confirmation - SteveOz: I Just Woke Up!',
                html: htmlContent
            });
            results.sent.push(customer.email);
        } catch (err) {
            results.failed.push({ email: customer.email, error: err.message });
        }
    }
    res.json({ message: "Recovery process complete", results });
});







app.post('/verify-payment', async (req, res) => {
    // Collect data sent from the frontend
    const { reference, name, email, phone, ticket, qty, total } = req.body;

    try {
        // 1. SECURITY: Check with Paystack if this payment is real
        const paystackRes = await axios.get(`https://api.paystack.co/transaction/verify/${reference}`, {
            headers: { Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}` }
        });

        // ONLY send emails if the transaction is confirmed as 'success'
        if (paystackRes.data.data.status === 'success') {
            
            const eventDate = 'Sunday, 12th July 2026';
            const eventVenue = 'Mike Adenuga Centre, 9 Osborne Road, Ikoyi, Lagos';

            // --- TICKET DESIGN HTML (The 'SteveOz' Theme) ---
            // Designed for maximum compatibility across email clients.
            const ticketHtml = `
            <!DOCTYPE html>
            <html>
            <body style="margin: 0; padding: 0; background-color: #f4f7f6; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;">
                <table width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color: #f4f7f6; padding: 20px 0;">
                    <tr>
                        <td align="center">
                            <table width="600" border="0" cellspacing="0" cellpadding="0" style="background-color: #1a1e2a; border-radius: 12px; overflow: hidden; box-shadow: 0 10px 30px rgba(0,0,0,0.4); margin: 0 auto; max-width: 600px;">
                                
                                <tr>
                                    <td align="center" style="background: linear-gradient(135deg, #1d2537 0%, #303e56 100%); padding: 30px;">
                                        <p style="margin: 0; font-size: 11px; color: #a1b0c9; letter-spacing: 2px; text-transform: uppercase;">AMICO RECORDS PRESENTS</p>
                                        <h1 style="margin: 5px 0 15px 0; font-size: 64px; color: #ffffff; letter-spacing: -2px; font-weight: 800; text-transform: uppercase;">STEVEOZ</h1>
                                        
                                        <table border="0" cellspacing="0" cellpadding="0" align="center">
                                            <tr>
                                                <td style="background-color: #102e1c; color: #87ff70; padding: 6px 12px; font-weight: bold; border-radius: 4px; font-size: 20px;">I</td>
                                                <td width="5"></td>
                                                <td style="background-color: #1c102e; color: #b087ff; padding: 6px 12px; font-weight: bold; border-radius: 4px; font-size: 20px;">JUST</td>
                                                <td width="5"></td>
                                                <td style="background-color: #2e2810; color: #ffeb87; padding: 6px 12px; font-weight: bold; border-radius: 4px; font-size: 20px;">WO</td>
                                                <td width="5"></td>
                                                <td style="background-color: #2e1010; color: #ff8787; padding: 6px 12px; font-weight: bold; border-radius: 4px; font-size: 20px;">K</td>
                                                <td width="5"></td>
                                                <td style="background-color: #101c2e; color: #87c3ff; padding: 6px 12px; font-weight: bold; border-radius: 4px; font-size: 20px;">E</td>
                                                <td width="5"></td>
                                                <td style="background-color: #2e2e2e; color: #ffebcc; padding: 6px 12px; font-weight: bold; border-radius: 4px; font-size: 20px;">UP</td>
                                            </tr>
                                        </table>
                                        <div style="display: inline-block; background-color: #e63329; color: #ffffff; padding: 4px 14px; border-radius: 10px; font-size: 11px; font-weight: bold; text-transform: uppercase; margin-top: 15px;">A Comedy Special</div>
                                    </td>
                                </tr>

                                <tr>
                                    <td style="padding: 40px; color: #c4d1e6;">
                                        <h2 style="color: #ffffff; font-size: 24px; margin-top: 0;">Hi ${name}, Your Ticket is Confirmed!</h2>
                                        <p style="font-size: 16px; line-height: 1.6; color: #a1b0c9;">Get ready for an unforgettable night! Your purchase of ${qty}× ${ticket} ticket(s) has been successfully verified.</p>
                                        <p style="font-size: 14px; color: #a1b0c9;">Please present this email at the gate along with a valid ID.</p>
                                        
                                        <div style="height: 1px; background-color: #313a4f; margin: 30px 0;"></div>
                                        
                                        <table width="100%" border="0" cellspacing="0" cellpadding="0">
                                            <tr>
                                                <td width="48%" valign="top" style="padding-bottom: 25px;">
                                                    <p style="margin: 0; font-size: 11px; color: #a1b0c9; text-transform: uppercase; letter-spacing: 1px;">DATE</p>
                                                    <p style="margin: 5px 0 0 0; font-size: 16px; color: #ffffff; font-weight: bold;">${eventDate}</p>
                                                    <p style="margin: 2px 0 0 0; font-size: 14px; color: #a1b0c9;">Doors: 4:00 PM | Start: 5:00 PM</p>
                                                </td>
                                                <td width="4%"></td>
                                                <td width="48%" valign="top">
                                                    <p style="margin: 0; font-size: 11px; color: #a1b0c9; text-transform: uppercase; letter-spacing: 1px;">VENUE</p>
                                                    <p style="margin: 5px 0 0 0; font-size: 16px; color: #ffffff; font-weight: bold; line-height: 1.3;">Mike Adenuga Centre</p>
                                                    <p style="margin: 2px 0 0 0; font-size: 13px; color: #a1b0c9;">9 Osborne Road, Ikoyi, Lagos</p>
                                                </td>
                                            </tr>
                                        </table>

                                        <div style="height: 1px; background-color: #313a4f; margin: 10px 0 30px 0;"></div>

                                        <table width="100%" border="0" cellspacing="0" cellpadding="15" style="background-color: #141721; border-radius: 8px;">
                                            <tr>
                                                <td style="color: #a1b0c9; font-size: 13px;">TICKET TYPE</td>
                                                <td style="color: #ffffff; font-size: 14px; font-weight: bold; text-align: right;">${ticket}</td>
                                            </tr>
                                            <tr>
                                                <td style="color: #a1b0c9; font-size: 13px;">QUANTITY</td>
                                                <td style="color: #ffffff; font-size: 14px; font-weight: bold; text-align: right;">${qty}</td>
                                            </tr>
                                            <tr>
                                                <td style="color: #a1b0c9; font-size: 13px;">TOTAL PAID</td>
                                                <td style="color: #ffffff; font-size: 18px; font-weight: bold; text-align: right; border-top: 1px solid #313a4f; padding-top: 20px;">₦${total.toLocaleString()}</td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>

                                <tr>
                                    <td align="center" style="background-color: #1d2537; padding: 25px 40px; border-top: 1px solid #313a4f;">
                                        <p style="margin: 0; font-size: 11px; color: #a1b0c9; text-transform: uppercase;">Ticket Reference</p>
                                        <p style="margin: 5px 0 0 0; font-size: 15px; color: #ffffff; font-weight: bold;">${reference}</p>
                                        
                                        <div style="height: 1px; background-color: #313a4f; margin: 15px 0;"></div>
                                        
                                        <p style="margin: 0; font-size: 12px; color: #a1b0c9;">Questions? Contact us: <a href="mailto:tickets@steveoz.ng" style="color: #87c3ff; text-decoration: none;">tickets@steveoz.ng</a></p>
                                        <p style="margin: 10px 0 0 0; font-size: 10px; color: #a1b0c9;">Event hosted by Amico Records.</p>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                </table>
            </body>
            </html>
            `;

            // --- 3. SEND THE E-TICKET TO THE BUYER ---
            await resend.emails.send({
                from: 'SteveOz - I Just Woke Up <tickets@steveoz.ng>',
                to: email,
                subject: 'Your E-Ticket Confirmation - SteveOz: I Just Woke Up!',
                html: ticketHtml // Insert the beautiful HTML here
            });

            // --- 4. SEND THE SIMPLE NOTIFICATION TO ADMIN ---
            await resend.emails.send({
                from: 'System Notification <tickets@steveoz.ng>',
                to: 'Emekaozor1@gmail.com', // Admin Email
                subject: 'New Ticket Sold: ' + ticket,
                html: `<p>New sale from ${name}. Details: ${qty} x ${ticket}, Ref: ${reference}</p>`
            });

            // Tell the frontend that everything went perfectly
            return res.json({ success: true });
        }
    } catch (error) {
        // If there was any error (Paystack down, Resend error), tell the frontend
        res.status(500).json({ error: error.message });
    }
});



app.listen(process.env.PORT, () => console.log(`Server running on port ${process.env.PORT}`));