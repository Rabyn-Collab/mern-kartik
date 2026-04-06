'use server';

import { Employee } from "@/models/Employee";
import axios from "axios";
import { revalidatePath } from "next/cache";



export async function addEmployee(values: any) {
  try {

    await axios.post('https://69ad5193b50a169ec87f232e.mockapi.io/employees', values);

    revalidatePath('/');

    return { success: true, message: ' added successfully' };

  } catch (err: any) {

    return { success: false, message: err.message };

  }

}


export async function deleteEmployee(id: number) {
  try {

    await axios.delete(`https://69ad5193b50a169ec87f232e.mockapi.io/employees/${id}`);

    revalidatePath('/');

    return { success: true, message: ' removed successfully' };

  } catch (err: any) {

    return { success: false, message: err.message };

  }

}


export async function updateEmployee(employee: Employee) {
  try {

    await axios.patch(`https://69ad5193b50a169ec87f232e.mockapi.io/employees/${employee.id}`, employee);

    revalidatePath('/');

    return { success: true, message: 'updated successfully' };

  } catch (err: any) {

    return { success: false, message: err.message };

  }

}