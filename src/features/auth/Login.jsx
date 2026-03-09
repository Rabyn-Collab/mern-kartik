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
import { useLoginUserMutation } from "./authApi.js"
import { Spinner } from "../../components/ui/spinner.jsx"
import { toast } from "sonner"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router"
import { setUser } from "../user/userSlice.js"


export const loginSchema = Yup.object({
  email: Yup.string().email('Invalid email').required('Email is required'),
  password: Yup.string().min(4, 'Password must be at least 4 characters').max(40, 'Password must be at most 40 characters').required('Password is required'),
});


export default function Login() {
  const [loginUser, { isLoading }] = useLoginUserMutation();
  const [isVisible, setIsVisible] = useState(false);
  const dispatch = useDispatch();
  const nav = useNavigate();

  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>Login to your account</CardTitle>
        <CardDescription>
          Enter your email below to login to your account
        </CardDescription>
        <CardAction>
          <Button
            onClick={() => nav('/register')}
            variant="link">Sign Up</Button>
        </CardAction>
      </CardHeader>
      <CardContent>

        <Formik
          initialValues={{
            email: '',
            password: ''
          }}
          onSubmit={async (val) => {
            try {
              const response = await loginUser(val).unwrap();
              dispatch(setUser(response));
              toast.success('Login successful');
              nav(-1);
            } catch (err) {
              toast.error(err.data.message);
            }

          }}

          validationSchema={loginSchema}
        >

          {({ values, errors, touched, handleChange, handleSubmit, }) => (
            <form onSubmit={handleSubmit}>
              <div className="flex flex-col gap-6">


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


                <Button
                  disabled={isLoading}
                  type="submit" className="w-full">
                  {isLoading ? <Spinner /> : 'Login'}
                </Button>




              </div>
            </form>

          )}
        </Formik>



      </CardContent>

    </Card>
  )
}
