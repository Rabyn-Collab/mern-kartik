import { useParams } from "react-router"

export default function MealList() {
  const { category } = useParams();

  return (
    <div>MealList</div>
  )
}
