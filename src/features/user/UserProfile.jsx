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
import * as Yup from 'yup';
import { Spinner } from "../../components/ui/spinner.jsx"
import { toast } from "sonner"
import { useNavigate } from "react-router"
import { useSelector } from "react-redux"
import { useGetProfileQuery, useUpdateUserMutation } from "./userApi.js"
import { base } from "../../app/mainApi.js"



export const updateSchema = Yup.object({
  fullname: Yup.string().min(4, 'Fullname must be at least 4 characters').max(40, 'Fullname must be at most 40 characters').required('Fullname is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  image: Yup.mixed().test('file Type', 'Unsupported file', (val) => {
    if (!val) return true;
    return ['image/png', 'image/jpeg', 'image/jpg', 'image/webp', 'image/gif'].includes(val.type)
  })
});


export default function UserProfile() {

  const { user } = useSelector((state) => state.userSlice);

  const nav = useNavigate();

  const [updateUser, { isLoading: updateLoading }] = useUpdateUserMutation();

  const { isLoading, data, error } = useGetProfileQuery(user?.token);
  if (isLoading) return <p>Loading...</p>
  if (error) return <p>{error.data?.message}</p>





  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>Update  your account</CardTitle>
        <CardDescription>
          Enter your details below to Update
        </CardDescription>

      </CardHeader>
      <CardContent>

        <Formik
          initialValues={{
            fullname: data.fullname,
            email: data.email,
            image: '',
            imageReview: data.image
          }}
          onSubmit={async (val) => {
            const formData = new FormData();

            formData.append('fullname', val.fullname);
            formData.append('email', val.email);
            if (val.image) formData.append('image', val.image);

            try {
              await updateUser({
                body: formData,
                token: user.token
              }).unwrap();
              toast.success('Profile updated successfully');
              nav(-1);

            } catch (err) {
              toast.error(err.data.message);
            }


          }}

          validationSchema={updateSchema}
        >

          {({ values, errors, touched, handleChange, handleSubmit, setFieldValue }) => (
            <form onSubmit={handleSubmit}>
              <div className="flex flex-col gap-6">

                <div className="grid gap-2">
                  <Label htmlFor="fullname">Full Name</Label>
                  <Input
                    name='fullname'
                    onChange={handleChange}
                    value={values.fullname}
                    id="fulllname"
                    type="text"
                    placeholder="fullname"

                  />
                  {errors.fullname && touched.fullname && <p className="text-destructive">{errors.fullname}</p>}
                </div>


                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    name='email'
                    onChange={handleChange}
                    value={values.email}
                    id="email"
                    type="email"
                    placeholder="m@example.com"

                  />
                  {errors.email && touched.email && <p className="text-destructive">{errors.email}</p>}
                </div>



                <div className="grid gap-2">
                  <Label htmlFor="image">Select Image</Label>
                  <Input
                    name='image'
                    onChange={(e) => {
                      const file = e.target.files[0];
                      setFieldValue('image', file);

                      setFieldValue('imageReview', URL.createObjectURL(file));


                    }}

                    type="file"
                    placeholder="image"

                  />
                  {values.imageReview && !errors.image && <img src={values.image ? values.imageReview : `${base}/${values.imageReview}`} alt={values.fullname} />}
                  {errors.image && touched.image && <p className="text-destructive">{errors.image}</p>}
                </div>


                <Button
                  disabled={updateLoading}
                  type="submit" className="w-full">
                  {updateLoading ? <Spinner /> : 'Update'}
                </Button>




              </div>
            </form>

          )}
        </Formik>



      </CardContent>

    </Card>
  )
}
