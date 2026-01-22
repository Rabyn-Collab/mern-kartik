import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { baseUrl } from '../../config/api.js';

export default function Meal() {
  const { id } = useParams();
  const [data, setData] = useState([]);
  const [load, setLoad] = useState(false);
  const [err, setErr] = useState();

  const getData = async () => {
    setLoad(true);

    try {
      const response = await axios.get(`${baseUrl}/lookup.php`, {
        params: {
          i: id
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


  return (
    <div className='p-5'>

      {data.map((meal) => {
        const videoKey = meal.strYoutube.split('v=')[1];

        let ingredientKeysNames = [];
        let measureKeysNames = [];
        {
          Object.keys(meal).map((key) => {
            if (key.includes('strIngredient')) {
              if (!meal[key]) return;
              ingredientKeysNames.push(meal[key]);
            }
          })
        }

        {
          Object.keys(meal).map((key) => {
            if (key.includes('strMeasure')) {
              if (!meal[key].trim()) return;
              measureKeysNames.push(meal[key]);
            }
          })
        }

        const objectArray = ingredientKeysNames.map((ingre, i) => {
          return {
            name: ingre,
            measure: measureKeysNames[i]
          }
        });



        return <div key={meal.idMeal} className='text-white'>


          <div className='grid grid-cols-[1fr_2fr]'>
            <img src={meal.strMealThumb} alt="" />

            <div>
              <div className='grid grid-cols-3 gap-7'>
                {objectArray.map((obj, i) => {
                  return <div key={i}>
                    <img
                      className='h-50 w-full '
                      src={`https://www.themealdb.com/images/ingredients/${obj.name}.png`} alt="" />
                    <h3 className='text-center mt-4'>{obj.measure}</h3>
                  </div>

                })}

              </div>

            </div>



          </div>

          <div className='mt-5 grid grid-cols-[1fr_2fr]'>

            <iframe width="420" height="315"
              allowFullScreen
              src={`https://www.youtube.com/embed/${videoKey}`}>
            </iframe>

            <div>
              <p>{meal.strInstructions}</p>
            </div>

          </div>



        </div>
      })}
    </div>
  )
}
