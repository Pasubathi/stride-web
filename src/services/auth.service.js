import axios from "axios";
const API_URL = process.env.REACT_APP_API_URI;

class AuthService {
  login(givenData, Url) {
    return axios
      .post(API_URL + Url, givenData)
      .then((response) => {
       // console.log('response', response);
        return response.data;
      });
  }

  post(givenData, Url) {
    return axios
      .post(API_URL + Url, givenData)
      .then((response) => {
       // console.log('response', response);
        return response.data;
      });
  }

  verifyOtp(givenData, Url) {
    return axios
      .post(API_URL + Url, givenData)
      .then((response) => {
       // console.log('response', response);
        return response.data;
      });
  }

  logout() {
    localStorage.removeItem("user");
  }

  register(username, email, password) {
    return axios.post(API_URL + "signup", {
      username,
      email,
      password,
    });
  }
}

export default new AuthService();
