import express from "express";
import { addBooking, deleteBooking, getBooking, getBookingByEmail, updateBookingStatus } from "../controller/bookingController.js";

const bookingRouter = express.Router();

bookingRouter.get("/getBookings", getBooking);
bookingRouter.get("/getBookingByEmail/:email", getBookingByEmail);
bookingRouter.post("/addBooking",addBooking);
bookingRouter.put("/updateBookingStatus",updateBookingStatus);
bookingRouter.delete("/deleteBooking/:bookingId",deleteBooking);


export default bookingRouter;