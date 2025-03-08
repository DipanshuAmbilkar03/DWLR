require('dotenv').config();
const twilio = require('twilio');

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

const sendMessage = async (to, body) => {
    console.log(`Attempting to send WhatsApp message to ${to}...`);

    try {
        const message = await client.messages.create({
            body: body,
            from: "whatsapp:+14155238886",
            to: `whatsapp:${to}`,
        });

        console.log("Message sent successfully:", message.sid);
        return message.sid;
    } catch (error) {
        console.error("Error sending message:", error);
        throw error;
    }
};

module.exports = sendMessage;
