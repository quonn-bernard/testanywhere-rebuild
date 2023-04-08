import express from "express";
const appointmentRouter = express.Router();
import {
  addAppointment,
  retrieveAppointments,
  updateAppointmentByID,
  deleteAppointmentByID,
  getAppointmentByID,
  retrieveAvailableTimes,
  retrieveUnavailableAppointmentDates
} from "../controllers/appointmentController.js"
// import protect from "../middleware/authMiddleWare.js";

appointmentRouter.get("/", retrieveAppointments);
appointmentRouter.post("/", addAppointment);
appointmentRouter.put("/:id", updateAppointmentByID);
appointmentRouter.delete("/:id", deleteAppointmentByID);
appointmentRouter.get("/:id", getAppointmentByID)
appointmentRouter.post("/get/available-times", retrieveAvailableTimes)
appointmentRouter.post("/unavailable-dates", retrieveUnavailableAppointmentDates)

export default appointmentRouter;
