import { Formik } from "formik";
import { Button } from "../../components/ui/button.jsx";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../../components/ui/card.jsx";
import { Input } from "../../components/ui/input.jsx";
import { Label } from "../../components/ui/label.jsx";
import { RadioGroup, RadioGroupItem } from "../../components/ui/radio-group.jsx";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "../../components/ui/select.jsx";
import { Textarea } from "../../components/ui/textarea.jsx";
import { Switch } from "../../components/ui/switch.jsx";
import { Field, FieldGroup } from "../../components/ui/field.jsx";
import { Checkbox } from "../../components/ui/checkbox.jsx";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";
import { todoSchema } from "./TodoAddFrom.jsx";


export default function TodoUpdateForm() {
  const { id } = useParams();
  const { todos } = useSelector((state) => state.todoSlice);

  const todo = todos.find((todo) => todo.id === id);





  const dispatch = useDispatch();
  const nav = useNavigate();

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
            email: todo.email,
            gender: todo.gender,
            country: todo.country,
            message: todo.message,
            airplanemode: todo.airplanemode,
            habits: todo.habits,
          }}

          onSubmit={(val) => {

          }}
          validationSchema={todoSchema}
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
                    value={values.email}
                    placeholder="m@example.com"

                  />
                  {errors.email && touched.email && <div className="text-red-500">{errors.email}</div>}
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="gender">Select Your Gender</Label>
                  <RadioGroup
                    name="gender"
                    onChange={handleChange}
                    className="w-fit mt-2">

                    <div className="flex items-center gap-3">
                      <RadioGroupItem

                        checked={values.gender === "male"}
                        value="male" id="r2" />
                      <Label htmlFor="r2">Male</Label>
                    </div>
                    <div className="flex items-center gap-3">
                      <RadioGroupItem
                        checked={values.gender === "female"}
                        value="female" id="r3" />
                      <Label htmlFor="r3">Female</Label>
                    </div>
                  </RadioGroup>

                  {errors.gender && touched.gender && <div className="text-red-500">{errors.gender}</div>}
                </div>


                <div className="grid gap-2">
                  <Label htmlFor="country">Select Your Country</Label>
                  <Select
                    name="country"
                    onValueChange={(e) => setFieldValue("country", e)}
                  >
                    <SelectTrigger className="w-full max-w-48">
                      <SelectValue placeholder="Select country" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Country</SelectLabel>
                        <SelectItem value="nepal">Nepal</SelectItem>
                        <SelectItem value="india">India</SelectItem>
                        <SelectItem value="china">China</SelectItem>

                      </SelectGroup>
                    </SelectContent>
                  </Select>

                  {errors.country && touched.country && <div className="text-red-500">{errors.country}</div>}



                </div>

                <div>
                  <Textarea
                    name="message"
                    onChange={handleChange}
                    value={values.message}
                    placeholder="Type your message here." />
                  {errors.message && touched.message && <div className="text-red-500">{errors.message}</div>}
                </div>

                <div className="flex items-center space-x-2">
                  <Switch
                    name="airplanemode"
                    onCheckedChange={(e) => setFieldValue("airplanemode", e)}
                    id="airplane-mode" />
                  <Label htmlFor="airplane-mode">Airplane Mode</Label>
                </div>




                <div>

                  <Label htmlFor="habits">Select Your Habits</Label>

                  <FieldGroup

                    className="max-w-sm mt-4">
                    <Field orientation="horizontal">
                      <Checkbox
                        onCheckedChange={(e) => {
                          const currentHabits = values.habits
                          if (e === true) {
                            setFieldValue("habits", [...currentHabits, "Dance"])
                          } else {
                            setFieldValue("habits", currentHabits.filter((item) => item !== "Dance"))
                          }
                        }}
                        id="habits"


                        value="Dance"
                        name="habits" />
                      <Label htmlFor="habits">Dance</Label>
                    </Field>

                    <Field orientation="horizontal">
                      <Checkbox
                        onCheckedChange={(e) => {
                          const currentHabits = values.habits
                          if (e === true) {
                            setFieldValue("habits", [...currentHabits, "Sing"])
                          } else {
                            setFieldValue("habits", currentHabits.filter((item) => item !== "Sing"))
                          }
                        }}
                        id="terms-checkbox"
                        value="Sing"
                        name="habits" />
                      <Label htmlFor="terms-checkbox">Sing</Label>
                    </Field>


                  </FieldGroup>
                  {errors.habits && touched.habits && <div className="text-red-500">{errors.habits}</div>}

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
