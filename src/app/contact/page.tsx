import { auth } from "@clerk/nextjs/server";
import Link from "next/link";

export default async function Contact() {
  const { isAuthenticated } = await auth();

  if (!isAuthenticated) {
    return (
      <div>
        <h1>Contact</h1>
        <Link href={'/login'}>Login</Link>
      </div>
    )
  }
  return (
    <div>
      <h1>Contact</h1>
      <Link href={'/contact/100'}>ContactById</Link>
    </div>
  )
}