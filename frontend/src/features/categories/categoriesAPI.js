import axios from "axios";

const url = process.env.REACT_APP_API_CAT_URL;

export const getCategories = async () => {
    const response = await axios.get(url)
    console.log(response)
    return response.data
}

export const getServicesByCategory = async (slug) => {
    const response = await axios.get(url + slug)
    return response.data
}
