import { useNavigate, useParams } from "react-router"
import { Card, CardTitle, CardFooter, CardHeader } from "../../components/ui/card.jsx";
import { Button } from "../../components/ui/button.jsx";
import { useApi } from "../../hooks/apiHooks.js";

export default function MealList() {

  const { category } = useParams();
  const nav = useNavigate();
  const [data, load, err] = useApi('filter.php', { c: category });


  if (load) return <h1>Loading...</h1>
  if (err) return <h1 className="text-red-300">{err}</h1>




  return (
    <div className="grid grid-cols-3 gap-12 p-5">
      {data.meals?.map((meal) => {
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
            <Button onClick={() => nav(`/meal/${meal.idMeal}`)} className="w-full">View More</Button>
          </CardFooter>
        </Card>
      })}
    </div>
  )
}
