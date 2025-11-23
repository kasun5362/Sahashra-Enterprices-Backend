import mongoose  from "mongoose";

const paymentSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },

    bookingId: {
        type:  Number,
        required: true
    },

    
});