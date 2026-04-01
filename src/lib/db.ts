import mongoose from "mongoose";



let connected: boolean = false;


export const connectDb = async () => {
  if (connected) return;
  try {
    await mongoose.connect('mongodb+srv://rabyn900:moles900@cluster0.ikwdezp.mongodb.net/Shp');
    connected = true;
  } catch (error) {
    console.log(error);
  }
}