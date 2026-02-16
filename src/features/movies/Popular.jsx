import { useSearchParams } from "react-router";
import { useGetPopularMovieQuery } from "./movieApi.js"
import MovieCompo from "./MovieCompo.jsx";
import { Button } from "../../components/ui/button.jsx";

export default function Popular() {
  const [searchParams, setSearchParams] = useSearchParams();
  const page = searchParams.get('page') || 1;
  const { isLoading, data, error } = useGetPopularMovieQuery(page);
  if (isLoading) return <div>Loading...</div>
  if (error) return <div>{error.message}</div>
  return (
    <div>
      <div className="p-5 grid grid-cols-4 gap-3">

        {data.results.map((movie) => (
          <MovieCompo movie={movie} key={movie.id} />
        ))}

      </div>
      <div className="flex gap-5">
        <Button
          disabled={Number(page) === 1}
          onClick={() => setSearchParams({ page: Number(page) - 1 })}
        >Prev</Button>
        <h1>{page}</h1>
        <Button
          onClick={() => setSearchParams({ page: Number(page) + 1 })}
        >Next</Button>
      </div>
    </div>
  )
}
