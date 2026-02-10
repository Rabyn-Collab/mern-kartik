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
import * as Yup from 'yup'
import { Textarea } from "../../components/ui/textarea.jsx"
import { useAddBlogMutation } from "./blogApi.js"
import { useNavigate } from "react-router"
import { toast } from "sonner"
import { Spinner } from "../../components/ui/spinner.jsx"

const valSchema = Yup.object({
  title: Yup.string().required('Required'),
  detail: Yup.string().required('Required'),
  author: Yup.string().required('Required'),
  image: Yup.string().url().required('Required'),
});

export default function AddBlog() {

  const [addBlog, { isLoading }] = useAddBlogMutation();
  const nav = useNavigate();
  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>Add a Blog</CardTitle>
        <CardDescription>
          Enter detail to add a blog
        </CardDescription>

      </CardHeader>
      <CardContent>



        <Formik
          initialValues={{
            title: '',
            detail: '',
            author: '',
            image: ''
          }}

          onSubmit={async (val) => {

            try {

              await addBlog(val).unwrap();
              toast.success('Blog added successfully');
              nav(-1);

            } catch (err) {
              toast.error(err.data.message);

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
                    placeholder="hello title"

                  />
                  {touched.title && errors.title && <p className="text-red-500">{errors.title}</p>}
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="detail">Detail</Label>
                  <Textarea
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
                disabled={isLoading}
                type="submit" className="w-full mt-5">
                {isLoading ? <Spinner /> : 'Submit'}
              </Button>
            </form>

          )}

        </Formik>


      </CardContent>

    </Card>
  )
}
