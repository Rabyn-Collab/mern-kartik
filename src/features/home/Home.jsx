import { useSearchParams } from "react-router";
import { useGetBlogsQuery } from "../blogs/blogApi.js"
import { Formik } from "formik";
import { Input } from "../../components/ui/input.jsx";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../../components/ui/card.jsx";
import { Button } from "../../components/ui/button.jsx";

export default function Home() {

  const [searchParams, setSearchParams] = useSearchParams();
  const queryObj = searchParams.get('search') === null ? {} : {
    search: searchParams.get('search')
  };

  const { data, isLoading, error } = useGetBlogsQuery(queryObj);




  if (isLoading) return <h1>Loading....</h1>

  if (error) return <h1 className="text-red-500">{error.message || error.error}</h1>



  return (
    <div>


      <div>
        <Formik
          initialValues={{
            search: ''
          }}
          onSubmit={(val) => {

            setSearchParams({ search: val.search })

          }}
        >
          {({ handleChange, values, handleSubmit, }) => (
            <form
              className="max-w-lg mb-3"
              onSubmit={handleSubmit}
            >
              <Input
                value={values.search}
                onChange={handleChange('search')}
                placeholder="search" />

            </form>
          )}
        </Formik>
      </div>


      <div className="grid grid-cols-3 gap-5">

        {data && data.map((blog) => {
          return <Card key={blog.id} className='max-w-md pt-0'>
            <CardContent className='px-0'>
              <img
                src={blog.image}
                alt='Banner'
                className='aspect-video h-70 rounded-t-xl object-cover'
              />
            </CardContent>
            <CardHeader>
              <CardTitle>{blog.title}</CardTitle>
              <CardDescription>{blog.detail}</CardDescription>
            </CardHeader>
            <CardFooter className='gap-3 max-sm:flex-col max-sm:items-stretch'>
              <Button>Explore More</Button>
              <Button variant={'outline'}>Download Now</Button>
            </CardFooter>
          </Card>
        })}

      </div>

    </div>
  )
}
