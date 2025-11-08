// services/whatsappService.js
import twilio from "twilio";
import dotenv from "dotenv";
dotenv.config();

const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

export async function sendWhatsAppMessage(message) {
  try {
    await client.messages.create({
      from: process.env.TWILIO_WHATSAPP_FROM,
      to: process.env.OWNER_WHATSAPP,
      body: message,
    });
    console.log("✅ WhatsApp message sent successfully!");
  } catch (error) {
    console.error("❌ Failed to send WhatsApp message:", error);
  }
}
