import { Formik } from "formik";
import { Button } from "../../components/ui/button.jsx";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../../components/ui/card.jsx";
import { Input } from "../../components/ui/input.jsx";
import { Label } from "../../components/ui/label.jsx";


export default function TodoAddFrom() {
  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>Add Some Todos</CardTitle>
        <CardDescription>
          Enter some details
        </CardDescription>

      </CardHeader>
      <CardContent>


        <Formik
          initialValues={{
            email: ''

          }}

          onSubmit={(val) => {
            console.log(val);

          }}
        >


          {({ handleChange, handleSubmit, values, errors, touched, setFieldValue }) => (
            <form onSubmit={handleSubmit}>
              <div className="flex flex-col gap-6">
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    onChange={handleChange}
                    type="email"
                    placeholder="m@example.com"

                  />
                </div>

              </div>
              <Button type="submit" className=" mt-7 w-full">
                Submit
              </Button>
            </form>

          )}





        </Formik>


      </CardContent>

    </Card>
  )
}
