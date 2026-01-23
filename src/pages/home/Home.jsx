import { useActionState } from "react";
import { Input } from "../../components/ui/input.jsx";
import CategoryMealList from "../meals/CategoryMealList.jsx";
import { useNavigate } from "react-router";


export default function Home() {
  const nav = useNavigate();

  const handleForm = (prevState, formData) => {
    const search = formData.get('search');
    if (!search) return;
    nav(`/search-meal?s=${search}`);

  }

  const [state, action] = useActionState(handleForm, null);

  return (
    <div className="text-white px-14">

      <div className="grid grid-cols-3 max-md:grid-cols-2 max-sm:grid-cols-1 justify-items-center">
        <img src="https://www.themealdb.com/images/meal-icon.png" alt="" />
        <div className="text-center space-y-4">
          <h1 className="text-4xl ">Welcome to TheMealDB</h1>
          <p>Welcome to TheMealDB: An open, crowd-sourced database of recipes from around the world.
            We offer a free recipe API for anyone wanting to use it, with additional premium features if required.</p>
        </div>
        <img src="https://www.themealdb.com/images/meal-icon.png" alt="" />
      </div>
      <hr />

      <form action={action} className="max-w-sm mt-5 mx-auto">
        <Input
          placeholder="Search For Meal"
          name="search"
        />
      </form>

      <CategoryMealList />



    </div>
  )
}
