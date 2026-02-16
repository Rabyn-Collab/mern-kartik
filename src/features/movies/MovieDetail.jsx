import { useParams } from "react-router"
import { useGetMovieQuery } from "./movieApi.js";
import MovieVideo from "./MovieVideo.jsx";

export default function MovieDetail() {
  const { id } = useParams();
  const { data, isLoading, error } = useGetMovieQuery(id);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;



  return (
    <div>

      <h1>{data.title}</h1>
      <p>{data.overview}</p>
      <img src={`https://image.tmdb.org/t/p/w500${data.poster_path}`} alt="" />

      <MovieVideo id={data.id} />
    </div>
  )
}
