import axios from "axios";
import { Cliente,Recepcionista } from "../types";
const URL_API = "/api/recepcionista";

const RecepcionistaAPI = {
  all: async () => {
    const { data, status } = await axios.get(`${URL_API}`);
    return {
      data,
      status,
    };
  },
  create: async (recepcionista: Recepcionista) => {
    const { data, status } = await axios.post(`${URL_API}`, recepcionista);
    return {
      data,
      status,
    };
  },
  update: async (recepcionista: Recepcionista) => {
    const { data, status } = await axios.patch(`${URL_API}`, recepcionista);
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

export default RecepcionistaAPI;
