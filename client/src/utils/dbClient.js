import axios from "axios";

const baseURL =
  process.env.NODE_ENV === "production"
    ? ""
    : "http://localhost:5001";

    console.log(baseURL)

export default axios.create({
  baseURL,
});