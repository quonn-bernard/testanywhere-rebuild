import axios from "axios";

const url = process.env.REACT_APP_API_SVC_URL;

export const getAllServices = async () => {
    const response = await axios.get(url)
    return response.data
}

export const getServiceBySlug = async (slug) => {
    const response = await axios.get(url + slug)
    return response.data
}

export const getServicesByCategory = async (slug) => {
    const response = await axios.get(url + "categories/" + slug)
    return response.data
}
