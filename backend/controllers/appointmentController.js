import asyncHandler from "express-async-handler";
import Appointment from "../models/appointmentsModel.js";
import {
  createAppointment,
  getAllAppointments,
  updateAppointment,
  deleteAppointment,
  getAvailableTimes,
  getUnavailableDates,
  sendAppointmentConfirmationEmail
} from "../services/appointmentsService.js";
import { response } from "express";
import sendEmail from "../utils/email/sendemail.js";
import * as dotenv from "dotenv";
dotenv.config();

const retrieveAppointments = asyncHandler(async (req, res) => {
  const appointments = await getAllAppointments();
  res.status(200).json(appointments);
});

const getAppointmentByID = asyncHandler(async (req, res) => {
  const existingAppointment = await Appointment.findById({
    _id: req.params.id,
  });
  if (!existingAppointment) {
    throw new ResourceRetrievalError("Appointment does not exist!");
  } else {
    res.status(200).json(existingAppointment);
  }
});

const retrieveAvailableTimes = asyncHandler(async (req, res) => {
  const queryDate = req.body.date;
  try {
    const times = await getAvailableTimes(queryDate);
    res.status(200).json(times);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

const addAppointment = asyncHandler(async (req, res) => {
  const existingAppt = await Appointment.find({
    date: req.body.date,
    time: req.body.time,
  });
  if (existingAppt.length != 0)
    res
      .status(400)
      .json({ message: "This appointment date/time is already booked!" });

  try {
    const appointment = await createAppointment(req.body);
    sendAppointmentConfirmationEmail(req.body.fname, req.body.lname, req.body.email, req.body.date, req.body.time)
    res.status(200).json(appointment);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

const updateAppointmentByID = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const existingAppointment = await Appointment.findById(id);
  if (!existingAppointment)
    res.status(404).json({ message: `Appointment not found!` });
  try {
    const appointment = await updateAppointment(id, req.body);
    res.status(200).json(appointment);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

const deleteAppointmentByID = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const appointment = await Appointment.findById(id);
  if (!appointment) res.status(404).json({ message: `Appointment not found!` });
  try {
    deleteAppointment(appointment);
    res.status(200).json({ message: "Appointment deleted successfully!" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

const retrieveUnavailableAppointmentDates = asyncHandler(async (req, res) => {
  const month = req.body.month;
  const year = req.body.year;
  try {
    const appointments = await Appointment.find({
      $expr: {
        $and: [
          {
            $eq: [
              {
                $month: "$date",
              },
              3,
            ],
          },
          {
            $eq: [
              {
                $year: "$date",
              },
              2020,
            ],
          },
        ],
      },
    });
  } catch (error) {}
  response.status(200).json({ data: month });
});

export {
  addAppointment,
  retrieveAppointments,
  updateAppointmentByID,
  deleteAppointmentByID,
  getAppointmentByID,
  retrieveAvailableTimes,
  retrieveUnavailableAppointmentDates,
};
