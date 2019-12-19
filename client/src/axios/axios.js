import axios from "axios";
import { getUserFromLs } from "../Utils/localStorge";

const haveToken = getUserFromLs();

export default axios.create({
  baseURL: "http://localhost:4000/api/v1/",
  headers: {
    Authorization: haveToken ? `Bearer ${haveToken && haveToken.token}` : "",
    "Content-Type": "application/json",
  },
});
