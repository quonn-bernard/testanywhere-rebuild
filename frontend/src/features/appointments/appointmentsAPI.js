import axios from "axios";

const url = '/appointments/';

export const addAppointment = async (apptData) => {
    const response = await axios.post(url, apptData)
    return response.data
}

export const getAvailableAppointmentTimes = async (date) => {
    const response = await axios.post(url + "get/available-times", date)
    return response.data
}

export const getUnavailableAppointmentDates = async (data) => {
    const response = await axios.post(url + "unavailable-dates", data)
    return response.data
}