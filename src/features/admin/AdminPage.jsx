import { EditIcon, TrashIcon } from "lucide-react";
import { base } from "../../app/mainApi.js";
import { Button } from "../../components/ui/button.jsx";
import { useGetProductsQuery } from "../products/productApi.js";
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { useNavigate } from "react-router";

export default function AdminPage() {

  const nav = useNavigate();

  const { data, isLoading, error } = useGetProductsQuery();

  if (isLoading) return <p>Loading...</p>

  if (error) return <p>{error.data}</p>


  return (
    <div>

      <div className="flex justify-end">

        <Button
          onClick={() => nav('/admin/form/add')}
        >Add Product</Button>

      </div>




      <div className='max-w-5xl mt-5'>
        <div className='[&>div]:rounded-sm [&>div]:border'>
          <Table>
            <TableHeader>
              <TableRow className='hover:bg-transparent'>
                <TableHead>Name</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Stock</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Brand</TableHead>
                <TableHead>Edit</TableHead>
                <TableHead className='text-right'>Remove</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.map(item => (
                <TableRow key={item._id}>
                  <TableCell>
                    <div className='flex items-center gap-3'>
                      <Avatar>
                        <AvatarImage src={`${base}/${item.image}`} alt={item.fallback} />
                        <AvatarFallback className='text-xs'>{item.fallback}</AvatarFallback>
                      </Avatar>
                      <div className='font-medium'>{item.title}</div>
                    </div>
                  </TableCell>
                  <TableCell>Rs.{item.price}</TableCell>
                  <TableCell>{item.category}</TableCell>
                  <TableCell>{item.stock}</TableCell>
                  <TableCell>{item.brand}</TableCell>
                  <TableCell>
                    <Button variant="outline">

                      <EditIcon />
                    </Button>

                  </TableCell>
                  <TableCell className='text-right'>
                    <Button variant="outline">

                      <TrashIcon />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

      </div>
    </div>
  )
}





