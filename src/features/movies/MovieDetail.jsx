import { useParams } from "react-router"
import { useGetMovieQuery } from "./movieApi.js";

export default function MovieDetail() {
  const { id } = useParams();
  const { data, isLoading, error } = useGetMovieQuery(id);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;

  console.log(data);
  return (
    <div>MovieDetail</div>
  )
}
