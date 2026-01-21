import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router"
import { baseUrl } from "../../config/api.js";
import { Card, CardTitle, CardFooter, CardHeader } from "../../components/ui/card.jsx";
import { Button } from "../../components/ui/button.jsx";

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
    <div className="grid grid-cols-3 gap-12 p-5">
      {data.map((meal) => {
        return <Card key={meal.idMeal} className="relative  pt-0 overflow-hidden">
          <div className="absolute inset-0 z-30 aspect-video bg-black/35" />
          <img
            src={meal.strMealThumb}
            alt="Event cover"
            className="relative z-20 aspect-video w-full object-cover "
          />
          <CardHeader>

            <CardTitle>{meal.strMeal}</CardTitle>

          </CardHeader>
          <CardFooter>
            <Button className="w-full">View More</Button>
          </CardFooter>
        </Card>
      })}
    </div>
  )
}
