import axios from "axios";

const SERVER_BASE_URL = "/api/";

const UserAPI = {
  current: async () => {
    const user: any = window.localStorage.getItem("user");
    const token = user?.token;
    try {
      const response = await axios.get(`/user`, {
        headers: {
          Authorization: `Token ${encodeURIComponent(token)}`,
        },
      });
      return response;
    } catch (error) {
      return error.response;
    }
  },
  login: async (email, password) => {
    try {
      const response = await axios.post(
        `${SERVER_BASE_URL}/users/login`,
        JSON.stringify({ user: { email, password } }),
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      return response;
    } catch (error) {
      return error.response;
    }
  },
  register: async (username, email, password) => {
    try {
      const response = await axios.post(
        `${SERVER_BASE_URL}/users`,
        JSON.stringify({ user: { username, email, password } }),
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      return response;
    } catch (error) {
      return error.response;
    }
  },

  get: async (username) => axios.get(`${SERVER_BASE_URL}/profiles/${username}`),
};

export default UserAPI;
