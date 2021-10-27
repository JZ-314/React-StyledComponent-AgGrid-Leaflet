import Axios from "axios";

const tokenObj = localStorage.getItem("accessToken");

export const API_HOST = "https://b263264f760d.ngrok.io";

export default Axios.create({
  baseURL: API_HOST,
  headers: {
    "Content-type": "application/json",
    Authorization: tokenObj?.token_type + " " + tokenObj?.access_token,
  },
  timeout: 100000,
});
