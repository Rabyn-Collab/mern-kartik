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
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Formik } from "formik"
import * as Yup from 'yup';
import { toast } from "sonner"
import { useNavigate } from "react-router"
import { Textarea } from "../../../components/ui/textarea.jsx"
import { useAddProductMutation } from "../../products/productApi.js"
import { Spinner } from "../../../components/ui/spinner.jsx"

export const categories = [
  "Electronics",
  "Clothing",
  "Shoes",
  "Books",
  "Home",
  "Beauty",
  "Sports",
  "Accessories"
];
export const brands = [
  "Apple",
  "Samsung",
  "Nike",
  "Adidas",
  "Sony",
  "Puma",
  "Dell",
  "HP"
];

const addSchema = Yup.object({
  title: Yup.string().min(4, 'Title must be at least 4 characters').max(40, 'Title must be at most 40 characters').required('Title is required'),
  description: Yup.string().min(4, 'Description must be at least 4 characters').max(40, 'Description must be at most 40 characters').required('Description is required'),
  price: Yup.number().required('Price is required'),
  category: Yup.string().required('Category is required'),
  brand: Yup.string().required('Brand is required'),
  stock: Yup.number().required('Stock is required'),
  image: Yup.mixed().test('file Type', 'Unsupported file', (val) => {
    return val && ['image/png', 'image/jpeg', 'image/jpg', 'image/webp', 'image/gif'].includes(val.type)
  }),
})

export default function Add() {

  const nav = useNavigate();
  const [addProduct, { isLoading }] = useAddProductMutation();

  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>Add a Product</CardTitle>
        <CardDescription>
          Enter details
        </CardDescription>

      </CardHeader>
      <CardContent>

        <Formik
          initialValues={{

            title: '',
            description: '',
            price: '',
            category: '',
            brand: '',
            stock: '',
            image: '',
            imageReview: '',


          }}
          onSubmit={async (val) => {


          }}
          validationSchema={addSchema}


        >

          {({ values, errors, touched, handleChange, handleSubmit, }) => (
            <form onSubmit={handleSubmit}>
              <div className="flex flex-col gap-6">


                <div className="grid gap-2">
                  <Label htmlFor="title">Title</Label>
                  <Input
                    name='title'
                    onChange={handleChange}
                    value={values.title}
                    id="title"
                    type="text"
                    placeholder="Title"

                  />
                  {errors.title && touched.title && <p className="text-destructive">{errors.title}</p>}
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    name='description'
                    onChange={handleChange}
                    value={values.description}
                    id="description"
                    type="text"
                    placeholder="Description"

                  />
                  {errors.description && touched.description && <p className="text-destructive">{errors.description}</p>}
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="category">Category</Label>

                  <Select>
                    <SelectTrigger className="w-full ">
                      <SelectValue placeholder="Select a Category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>

                        {categories.map((category, index) => (
                          <SelectItem key={index} value={category}>{category}</SelectItem>
                        ))}

                      </SelectGroup>
                    </SelectContent>
                  </Select>

                  {errors.category && touched.category && <p className="text-destructive">{errors.category}</p>}
                </div>


                <div className="grid gap-2">
                  <Label htmlFor="brand">Brand</Label>

                  <Select>
                    <SelectTrigger className="w-full ">
                      <SelectValue placeholder="Select a Brand" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>

                        {brands.map((brand, index) => (
                          <SelectItem key={index} value={brand}>{brand}</SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>

                  {errors.brand && touched.brand && <p className="text-destructive">{errors.brand}</p>}
                </div>





                <div className="grid gap-2">
                  <Label htmlFor="price">Price</Label>
                  <Input
                    name='price'
                    onChange={handleChange}
                    value={values.price}
                    id="price"
                    type="number"
                    placeholder="Price"

                  />
                  {errors.price && touched.price && <p className="text-destructive">{errors.price}</p>}
                </div>


                <div className="grid gap-2">
                  <Label htmlFor="stock">Stock</Label>
                  <Input
                    name='stock'
                    onChange={handleChange}
                    value={values.stock}
                    id="stock"
                    type="number"
                    placeholder="Stock"

                  />
                  {errors.stock && touched.stock && <p className="text-destructive">{errors.stock}</p>}
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
                  {isLoading ? <Spinner /> : 'Submit'}
                </Button>




              </div>
            </form>

          )}
        </Formik>



      </CardContent>

    </Card>
  )
}
