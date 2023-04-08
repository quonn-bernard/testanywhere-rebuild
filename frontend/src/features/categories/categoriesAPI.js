import axios from "axios";

const url = '/categories/';

export const getCategories = async () => {
    const response = await axios.get(url)
    return response.data
}

export const getServicesByCategory = async (slug) => {
    const response = await axios.get(url + slug)
    return response.data
}
