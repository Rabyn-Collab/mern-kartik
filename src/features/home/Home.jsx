import { Formik } from "formik";
import { Button } from "../../components/ui/button.jsx";
import * as Yup from 'yup';

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Input } from "../../components/ui/input.jsx";
import { useLanguageTranslateMutation } from "../translate/translateApi.js";
import { Spinner } from "../../components/ui/spinner.jsx";
import { toast } from "sonner";

const valSchema = Yup.object({
  from: Yup.string().required('Required'),
  to: Yup.string().required('Required'),
  query: Yup.string().required('Required'),
});


export default function Home() {
  const [translate, { isLoading, data }] = useLanguageTranslateMutation();

  console.log(data);
  return (
    <div>




      <Formik

        initialValues={{
          from: '',
          to: '',
          query: '',
        }}
        onSubmit={async (val, { resetForm }) => {
          try {
            await translate(val).unwrap();
            resetForm();
            toast.success('Success');
          } catch (err) {
            toast.error('Something went wrong');

          }

        }}

        validationSchema={valSchema}
      >


        {({ errors, touched, values, handleChange, setFieldValue, handleSubmit }) => (
          <form
            onSubmit={handleSubmit}
            className="max-w-lg space-y-5">

            <Select
              value={values.from}
              name="from"
              onValueChange={(val) => {
                setFieldValue('from', val);
              }}
            >
              <SelectTrigger className="w-full max-w-48">
                <SelectValue placeholder="Select a language code" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>

                  <SelectItem value="en">English</SelectItem>
                  <SelectItem value="gu">Gujrati</SelectItem>
                  <SelectItem value="ja">Japanese</SelectItem>
                  <SelectItem value="mi">Maori</SelectItem>
                  <SelectItem value="ne">Nepali</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
            {errors.from && touched.from && <p className="text-red-600">{errors.from}</p>}

            <Input
              name='query'
              value={values.query}
              onChange={handleChange}
              placeholder="Add a query"
            />
            {errors.query && touched.query && <p className="text-red-600">{errors.query}</p>}


            <Select
              value={values.to}
              name="to"
              onValueChange={(val) => {
                setFieldValue('to', val);
              }}

            >
              <SelectTrigger className="w-full ">
                <SelectValue placeholder="Select a translate language code" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>


                  <SelectItem value="en">English</SelectItem>
                  <SelectItem value="gu">Gujrati</SelectItem>
                  <SelectItem value="ja">Japanese</SelectItem>
                  <SelectItem value="mi">Maori</SelectItem>
                  <SelectItem value="ne">Nepali</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
            {errors.to && touched.to && <p className="text-red-600">{errors.to}</p>}



            <Button
              disabled={isLoading}
              type="submit">
              {isLoading ? <Spinner /> : 'Translate'}
            </Button>

          </form>
        )}


      </Formik>




      <div className="mt-5">
        {data && <h1>{data.query}</h1>}
        {data && <h1>{data.translation}</h1>}
      </div>




    </div>
  )
}
