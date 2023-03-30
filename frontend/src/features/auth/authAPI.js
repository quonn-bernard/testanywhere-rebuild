import axios from "axios";
const API_URL = process.env.REACT_APP_REDUX_STORE_API_URL;

    const register = async (userData) => {
    const response = await axios.post(API_URL + 'user-registration', userData);
    if (response.data) {
      localStorage.setItem("user", JSON.stringify(response.data));
    }
  
    return response.data;
  };

  const login = async (userData) => {
    const response = await axios.post(API_URL, userData);
    if (response.data) {
      localStorage.setItem("user", JSON.stringify(response.data));
    }
  
    return response.data;
  };
  
  const authAPI = {
    register,
    login
  };
  
  export default authAPI;