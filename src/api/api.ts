import axios from "axios";

export const api = axios.create({
  baseURL: "https://www.dnd5eapi.co"
});
