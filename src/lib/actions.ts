'use server';

import axios from "axios";



export async function addEmployee(values: any) {
  try {

    await axios.post('https://69ad5193b50a169ec87f232e.mockapi.io/employe', values);


    return { success: true, message: ' added successfully' };

  } catch (err) {

    return { success: false, message: `${err}` };

  }

}