import axios from "axios";
import { getInvetoryData } from "../services/service";

export const getInvetoryDataFormApi = async () =>
  await axios
    .get(getInvetoryData)
    .then((res) => res.data)
    .catch((err) => console.error(err));
