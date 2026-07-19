import Booking from "../model/booking.js";
import { isAdmin, isUserNull } from "./userController.js";
import { sendWhatsAppMessage } from "../services/whatsappService.js";

export async function addBooking(req, res) {
  const bookingData = req.body;

  
  try {
    if (isUserNull(req)) {
      return res.status(401).json({
        message: "You are not authorized to perform this task",
      });
    }

    // Auto increment ID
    let id = 1;
    const lastBooking = await Booking.findOne().sort({ id: -1 });
    if (lastBooking) id = lastBooking.id + 1;

    // Assign user data
    bookingData.id = id;
    bookingData.email = req.user.email;
    bookingData.nic = req.user.nic;
    bookingData.profilePic = req.user.profilePic;
    bookingData.contact = req.user.contact;
    bookingData.address = req.user.address;
    
 


    // If spare part, remove rental dates
    if (bookingData.productType === "spare") {
      delete bookingData.pickupDate;
      delete bookingData.returnDate;
    }

   

    const booking = new Booking(bookingData);
    await booking.save();

    // ✅ Build a detailed WhatsApp message
    const message = `
🌟 *New Booking Received!*

🆔 *Booking ID:* ${booking.id}
📅 *Booking Date:* ${new Date(booking.bookingDate).toLocaleDateString()}

👤 *Customer Details*
───────────────────
📧 Email: ${booking.email}
📞 Contact: ${booking.contact}
🏠 Address: ${booking.address}
🪪 NIC: ${booking.nic}

📦 *Product Details*
───────────────────
🛍️ Name: ${booking.productName}
🔑 Product Key: ${booking.productKey}
📂 Category: ${booking.productCategories.join(", ")}
📦 Type: ${booking.productType.toUpperCase()}
🧮 Quantity: ${booking.productQuantity}
💰 Price: Rs. ${booking.rentalCost.toLocaleString()}

📅 *Dates*
───────────────────
${booking.productType === "rental" ? 
`🚚 Pickup: ${new Date(booking.pickupDate).toLocaleDateString()}
📦 Return: ${new Date(booking.returnDate).toLocaleDateString()}` : 
`⚙️ This is a Spare Parts Order`}

🟡 *Current Status:* ${booking.deliveryStatus.toUpperCase()}

📸 *Images:*
───────────────────
🧾 Product: ${booking.productImage}
${booking.productType === "rental" ? 
`🪪 NIC Front: ${booking.nicFrontImage}\n🪪 NIC Back: ${booking.nicBackImage}` : ""}

💬 *Please review and process this order promptly.*
    `;

    // ✅ Send WhatsApp message to owner
    await sendWhatsAppMessage(message);

    res.json({
      message: "Booking created successfully and WhatsApp message sent.",
    });

  } catch (e) {
    console.error("Error in addBooking:", e);
    res.status(500).json({
      message: "Internal server error: " + e.message,
    });
  }
}




export async function getBooking(req, res) {
  try {
    if (isUserNull(req)) {
      res.status(401).json({
        message: "You are not authorized to perform this task",
      });
      return;
    }

    const bookings = await Booking.find();
    res.json(bookings);
  } catch (e) {
    res.status(500).json({
      message: "Internal server error",
      error: e.message,
    });
  }
}

export async function getBookingByEmail(req, res) {
  try {
    if (isUserNull(req)) {
      res.status(401).json({
        message: "You are not authorized to perform this task",
      });
      return;
    }

    const email = req.params.email;
    const bookings = await Booking.find({ email: email });
    res.json(bookings);
  } catch (e) {
    res.status(500).json({
      message: "Internal server error: " + e.message,
    });
  }
}

export async function updateBookingStatus(req, res) {
  const { bookingId, deliveryStatus } = req.body;
  try {
    if (isUserNull(req)) {
      res.status(401).json({
        message: "You are not authorized to perform this task",
      });
      return;
    }
    const booking = await Booking.updateOne(
      {
        id: bookingId,
      },
      {
        deliveryStatus: deliveryStatus,
      }
    );

    res.json({
      message: "Booking status updated successfully",
      booking,
    });
  } catch (e) {
    res.status(500).json({
      message: "Internal server error",
      error: e.message,
    });
  }
}

export async function deleteBooking(req, res) {
  const bookingId = req.params.bookingId;
  const userEmail = req.user.email;

  try {
    if (isUserNull(req)) {
      res.status(401).json({
        message: "You are not authorized to perform this task",
      });
      return;
    }

    if (!isAdmin(req)) {
      const booking = await Booking.findOne({ id: bookingId });

      if (booking.email !== userEmail) {
        res.status(403).json({
          message: "You are not authorized to delete this booking",
        });
        return;
      }
    }

    await Booking.deleteOne({
      id: bookingId,
    });
    res.json({
      message: "Booking deleted successfully",
    });
  } catch (e) {
    res.status(500).json({
      message: "Internal server error",
      error: e.message,
    });
  }
}
