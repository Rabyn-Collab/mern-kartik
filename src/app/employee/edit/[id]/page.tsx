import EditEmployee from "@/components/EditEmployee";
import { Employee } from "@/models/Employee";
import axios from "axios";

export default async function EditPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  const response = await axios.get(`https://69ad5193b50a169ec87f232e.mockapi.io/employees/${id}`);

  const employee: Employee = response.data;

  return (
    <div>

      <EditEmployee employee={employee} />
    </div>
  )
}