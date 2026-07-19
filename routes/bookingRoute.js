import express from "express";
import { addBooking, deleteBooking, getBooking, getBookingByEmail, updateBookingStatus } from "../controller/bookingController.js";
import { authenticateToken } from "../middleware/AuthMiddleware.js";
import upload from "../utils/cloudinaryConfig.js";

const bookingRouter = express.Router();

bookingRouter.get("/getBookings",authenticateToken, getBooking);
bookingRouter.get("/getBookingByEmail/:email",authenticateToken, getBookingByEmail);
bookingRouter.post("/addBooking",authenticateToken, addBooking);
bookingRouter.put("/updateBookingStatus",authenticateToken, updateBookingStatus);
bookingRouter.delete("/deleteBooking/:bookingId",authenticateToken, deleteBooking);


export default bookingRouter;