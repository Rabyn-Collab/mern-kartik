import { useGetUpComingQuery } from "./movieApi.js";
import MovieCompo from "./MovieCompo.jsx";


export default function Upcoming() {
  const { isLoading, data, error } = useGetUpComingQuery();
  if (isLoading) return <div>Loading...</div>
  if (error) return <div>{error.message}</div>
  return (
    <div className="p-5 grid grid-cols-4 gap-3">

      {data.results.map((movie) => (
        <MovieCompo movie={movie} key={movie.id} />
      ))}

    </div>
  )
}
