import { Button } from "@/components/ui/button"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Formik } from "formik"
import { EyeIcon, EyeOffIcon } from "lucide-react"
import { useState } from "react"
import * as Yup from 'yup';
import { Spinner } from "../../components/ui/spinner.jsx"
import { toast } from "sonner"
import { useNavigate } from "react-router"
import { useRegisterUserMutation } from "./authApi.js"



export const registerSchema = Yup.object({
  fullname: Yup.string().min(4, 'Fullname must be at least 4 characters').max(40, 'Fullname must be at most 40 characters').required('Fullname is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  password: Yup.string().min(4, 'Password must be at least 4 characters').max(40, 'Password must be at most 40 characters').required('Password is required'),
  image: Yup.mixed().test('file Type', 'Unsupported file', (val) => {
    return val && ['image/png', 'image/jpeg', 'image/jpg', 'image/webp', 'image/gif'].includes(val.type)
  }).required()
});


export default function Register() {
  const [isVisible, setIsVisible] = useState(false);
  const [registerUser, { isLoading }] = useRegisterUserMutation();

  const nav = useNavigate();

  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>Register to your account</CardTitle>
        <CardDescription>
          Enter your details below to Register
        </CardDescription>
        <CardAction>
          <Button
            onClick={() => nav(-1)}
            variant="link">Login</Button>
        </CardAction>
      </CardHeader>
      <CardContent>

        <Formik
          initialValues={{
            fullname: '',
            email: '',
            password: '',
            image: '',
            imageReview: ''
          }}
          onSubmit={async (val) => {
            const formData = new FormData();
            formData.append('fullname', val.fullname);
            formData.append('email', val.email);
            formData.append('password', val.password);
            formData.append('image', val.image);
            try {
              await registerUser(formData).unwrap();
              toast.success('Registration successful');
              nav(-1);
            } catch (error) {
              toast.error(error.data.message);
            }

          }}

          validationSchema={registerSchema}
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
                  <div className="flex items-center">
                    <Label htmlFor="password">Password</Label>
                  </div>
                  <div className="relative">
                    <Input
                      name='password'
                      onChange={handleChange}
                      value={values.password}
                      type={isVisible ? 'text' : 'password'} placeholder='Password' className='pr-9' />
                    <Button
                      type='button'
                      variant='ghost'
                      size='icon'
                      onClick={() => setIsVisible(prevState => !prevState)}
                      className='text-muted-foreground focus-visible:ring-ring/50 absolute inset-y-0 right-0 rounded-l-none hover:bg-transparent'
                    >
                      {isVisible ? <EyeIcon /> : <EyeOffIcon />}
                      <span className='sr-only'>{isVisible ? 'Hide password' : 'Show password'}</span>
                    </Button>
                  </div>
                  {errors.password && touched.password && <p className="text-destructive">{errors.password}</p>}
                </div>


                <div className="grid gap-2">
                  <Label htmlFor="image">Select Image</Label>
                  <Input
                    name='image'
                    onChange={(e) => {
                      const file = e.target.files[0];

                      setFieldValue('imageReview', URL.createObjectURL(file));
                      setFieldValue('image', file);

                    }}

                    type="file"
                    placeholder="image"

                  />
                  {values.imageReview && !errors.image && <img src={values.imageReview} alt={values.fullname} />}
                  {errors.image && touched.image && <p className="text-destructive">{errors.image}</p>}
                </div>


                <Button
                  disabled={isLoading}
                  type="submit" className="w-full">
                  {isLoading ? <Spinner /> : 'Register'}
                </Button>




              </div>
            </form>

          )}
        </Formik>



      </CardContent>

    </Card>
  )
}
