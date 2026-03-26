import { Formik } from "formik";
import { Input } from "../../components/ui/input.jsx";
import { useRef } from "react";

export default function SearchComponent({ setSearchParams }) {
  const inputRef = useRef(null);
  return (
    <div className="mb-5 max-w-sm">


      <Formik
        initialValues={{
          search: ''
        }}
        onSubmit={(val, { }) => {
          setSearchParams({ search: val.search });
          inputRef.current?.blur();

        }}
      >
        {({ handleChange, handleSubmit, values }) => (
          <form
            onSubmit={handleSubmit}
          >
            <Input
              ref={inputRef}
              type="text"
              name='search'
              value={values.search}
              onChange={handleChange}
              placeholder="Search"
            />

          </form>
        )}
      </Formik>


    </div>
  )
}