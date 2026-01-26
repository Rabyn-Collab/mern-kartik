import { useNavigate, useSearchParams } from 'react-router'
import { useApi } from '../../hooks/apiHooks.js';

export default function SearchMeal() {
  const [searchParams, setSearchParams] = useSearchParams();



  const nav = useNavigate();
  const [data, load, err] = useApi('search.php', { s: searchParams.get('s') });


  if (load) return <h1>Loading...</h1>
  if (err) return <h1 className="text-red-300">{err}</h1>



  return (
    <div className='p-5 text-white'>

      {data === null ? <h1>Not Data Available</h1> : <div className='grid grid-cols-4 gap-10'>

        {data.meals?.map((meal) => {
          return <div key={meal.idMeal}>
            <img
              className='cursor-pointer'
              onClick={() => nav(`/meal/${meal.idMeal}`)}
              src={meal.strMealThumb} alt="" />
            <h3 className='text-[#F4722B]'>{meal.strMeal}</h3>

          </div>
        })}

      </div>}


    </div>
  )
}
