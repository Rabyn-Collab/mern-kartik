
export default function GreetCard({ title, color }) {




  return (
    <div className={`h-50  ${color} border rounded-xl p-4`}>

      <h1 className="text-2xl font-bold ">{title}</h1>
      <p>Lorem ipsum dolor sit amet.</p>

    </div>
  )
}
