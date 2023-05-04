import axios from "axios";

export const GET = (payload) =>
  axios.get(process.env.REACT_APP_USERS_URL + payload);

export const POST = (payload) =>
  axios.post(process.env.REACT_APP_USERS_URL, payload);

export const PATCH = (id, payload) =>
  axios.patch(process.env.REACT_APP_USERS_URL + `/${id}`, payload);
