import axios from "axios";

const baseURL =
  process.env.NODE_ENV === "production"
    ? ""
    : "http://localhost:3006";

    console.log(baseURL)

export default axios.create({
  baseURL,
});