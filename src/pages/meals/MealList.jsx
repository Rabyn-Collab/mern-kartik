import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router"
import { baseUrl } from "../../config/api.js";

export default function MealList() {
  const { category } = useParams();
  const nav = useNavigate();
  const [data, setData] = useState([]);
  const [load, setLoad] = useState(false);
  const [err, setErr] = useState();

  const getData = async () => {
    setLoad(true);

    try {
      const response = await axios.get(`${baseUrl}/filter.php`, {
        params: {
          c: category
        }
      });
      setLoad(false);
      setData(response.data.meals);

    } catch (err) {
      setLoad(false);
      setErr(err.message);
    }

  }


  useEffect(() => {
    getData();
  }, []);

  if (load) return <h1>Loading...</h1>
  if (err) return <h1 className="text-red-300">{err}</h1>

  console.log(data);

  return (
    <div>MealList</div>
  )
}
