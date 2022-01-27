import axios from "axios";
import { getSessionToken } from "./libs/nexo/helpers";
import nexo from "./nexoClient";

const axiosIntance = axios.create({
  baseURL: process.env.REACT_APP_API_BFF,
});

axiosIntance.interceptors.request.use(async (request) => {
  const token = await getSessionToken(nexo);
  const bearerToken = `Bearer ${token}`;
  request.headers = { ...request.headers, Authorization: bearerToken };
  return request;
});

export default axiosIntance;
