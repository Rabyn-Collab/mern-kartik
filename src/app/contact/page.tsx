import Link from "next/link";

export default function Contact() {
  return (
    <div>
      <h1>Contact</h1>
      <Link href={'/contact/100'}>ContactById</Link>
    </div>
  )
}