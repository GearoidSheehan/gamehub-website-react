import axios from "axios";

export default axios.create({
  baseURL: "https://api.rawg.io/api",
  params: {
    key: "42f385ccf9ab4d498423c5ca4701c379",
  },
});
