import axios from "axios";
import { Cliente } from "../types";
const URL_API = "/api/client";

const ClientAPI = {
  all: async () => {
    const { data, status } = await axios.get(`${URL_API}`);
    return {
      data,
      status,
    };
  },
  create: async (client) => {
    const { data, status } = await axios.post(`${URL_API}`, client);
    return {
      data,
      status,
    };
  },
  update: async (client) => {
    const { data, status } = await axios.patch(`${URL_API}`, client);
    return {
      data,
      status,
    };
  },
  delete: async (id: string) => {
    const { data, status } = await axios.delete(`${URL_API}?id=${id}`);
    return {
      status,
    };
  },
};

export default ClientAPI;
