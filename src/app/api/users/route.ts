import { connectDb } from "@/lib/db";
import { User } from "@/models/User";
import { NextRequest, NextResponse } from "next/server";




export async function GET(req: NextRequest) {
  try {
    await connectDb();
    const users = await User.find({});
    return NextResponse.json(users, { status: 200 });

  } catch (err) {
    return NextResponse.json({ message: err }, { status: 400 });

  }

  // const params = req.nextUrl.searchParams;
  // console.log(params.get('page'));
  // //console.log(req.nextUrl.searchParams);

  // const head = req.headers;
  // console.log(head.get('key'));
  // return NextResponse.json({ name: "John Doe" }, { status: 200 });

}


export async function POST(req: NextRequest) {

  try {
    const body = await req.json();
    console.log(body);

    return NextResponse.json({ name: "John Doe" }, { status: 200 });
  } catch (err) {
    return NextResponse.json({ message: err }, { status: 400 });
  }


}