import axios from "axios";
import services from "../services/service";

export const getInvetoryDataFormApi = async () =>
  await axios
    .get(services.getInvetoryData)
    .then((res) => res.data)
    .catch((err) => console.error(err));
