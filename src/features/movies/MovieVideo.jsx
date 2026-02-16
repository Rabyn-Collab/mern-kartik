import { useGetVideoMovieQuery } from "./movieApi.js"

export default function MovieVideo({ id }) {
  const { isLoading, error, data } = useGetVideoMovieQuery(id);

  if (isLoading) return <div>Loading...</div>
  if (error) return <div>{error.message}</div>


  console.log(data);

  return (
    <div>



      <div className="w-full flex  overflow-scroll mt-5 gap-5">

        {data.results.map((video) => (
          <iframe key={video.key} className="shrink-0 w-125 h-125"
            src={`https://www.youtube.com/embed/${video.key}`}
            allowFullScreen
          >
          </iframe>
        ))}

      </div>







    </div>
  )
}
