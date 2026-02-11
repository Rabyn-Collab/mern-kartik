import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Formik } from "formik"
import { Textarea } from "../../components/ui/textarea.jsx"
import { useNavigate, useParams } from "react-router"
import { toast } from "sonner"
import { Spinner } from "../../components/ui/spinner.jsx"
import { valSchema } from "./AddBlog.jsx"
import { useGetBlogQuery, useUpdateBlogMutation } from "./blogApi.js"



export default function UpdateBlog() {
  const { id } = useParams();
  const { data, isLoading, error } = useGetBlogQuery(id);
  const nav = useNavigate();

  const [updateBlog, { isLoading: isLoad }] = useUpdateBlogMutation();


  if (isLoading) return <h1>Loading...</h1>
  if (error) return <h1 className="text-red-500">{error.message || error.error}</h1>






  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>Update a Blog</CardTitle>
        <CardDescription>
          Enter detail to update a blog
        </CardDescription>

      </CardHeader>
      <CardContent>



        <Formik
          initialValues={{
            title: data.title,
            detail: data.detail,
            author: data.author,
            image: data.image
          }}

          onSubmit={async (val) => {

            try {
              await updateBlog({
                id,
                body: val
              }).unwrap();
              toast.success('Blog updated successfully');
              nav(-1);
            } catch (err) {
              toast.error(err.message);
            }



          }}
          validationSchema={valSchema}

        >

          {({ handleChange, values, errors, touched, handleSubmit }) => (

            <form
              onSubmit={handleSubmit}
            >
              <div className="flex flex-col gap-6">


                <div className="grid gap-2">
                  <Label htmlFor="title">Title</Label>
                  <Input
                    value={values.title}
                    onChange={handleChange}
                    id="title"
                    type="text"
                    name='title'
                    placeholder="hello title"

                  />
                  {touched.title && errors.title && <p className="text-red-500">{errors.title}</p>}
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="detail">Detail</Label>
                  <Textarea
                    name='detail'
                    value={values.detail}
                    onChange={handleChange}
                    id="detail"
                    type="text"
                    placeholder="hello detail"
                  />
                  {touched.detail && errors.detail && <p className="text-red-500">{errors.detail}</p>}
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="author">Author</Label>
                  <Input
                    name='author'
                    value={values.author}
                    onChange={handleChange}
                    id="author"
                    type="text"
                    placeholder="author"

                  />
                  {touched.author && errors.author && <p className="text-red-500">{errors.author}</p>}
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="image">Image</Label>
                  <Input
                    name='image'
                    value={values.image}
                    onChange={handleChange}
                    id="image"
                    type="text"
                    placeholder="image"

                  />
                  {touched.image && errors.image && <p className="text-red-500">{errors.image}</p>}
                </div>



              </div>


              <Button
                disabled={isLoad}
                type="submit" className="w-full mt-5">
                {isLoad ? <Spinner /> : 'Submit'}
              </Button>
            </form>

          )}

        </Formik>


      </CardContent>

    </Card>
  )
}
