import axios from "axios";
import { useEffect, useState } from "react";
import { baseUrl } from "../config/api.js";




export const useApi = (endpoint, params) => {

  const [data, setData] = useState([]);
  const [load, setLoad] = useState(false);
  const [err, setErr] = useState();

  const getData = async () => {
    setLoad(true);

    try {
      const response = await axios.get(`${baseUrl}/${endpoint}`, {
        params
      });
      setLoad(false);
      setData(response.data);

    } catch (err) {
      setLoad(false);
      setErr(err.message);
    }

  }

  useEffect(() => {
    getData();
  }, []);



  return [data, load, err];

}