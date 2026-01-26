import { useNavigate } from "react-router";
import { useApi } from "../../hooks/apiHooks.js";

export default function CategoryMealList() {


  const nav = useNavigate();
  const [data, load, err] = useApi('categories.php');


  if (load) return <h1>Loading...</h1>
  if (err) return <h1 className="text-red-300">{err}</h1>



  return (
    <div className="my-10 text-center">

      <h2>Meal Category</h2>

      <div className="grid grid-cols-4 max-lg:grid-cols-3 max-md:grid-cols-2 max-sm:grid-cols-1 gap-10 mt-6 justify-items-center">
        {data.categories?.map((category) => {
          return <div
            onClick={() => nav(`/meal-list/${category.strCategory}`)}
            className="cursor-pointer" key={category.idCategory}>
            <img src={category.strCategoryThumb} alt="" />
            <h3 className="text-[#E3B55E]">{category.strCategory}</h3>

          </div>
        })}
      </div>


    </div>
  )
}
