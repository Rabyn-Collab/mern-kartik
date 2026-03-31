export default async function ContactById({ params, searchParams }: { params: Promise<{ id: string }>, searchParams: Promise<{ a: string }> }) {
  const { id } = await params;
  console.log(await searchParams)
  return (
    <div>ContactById {id}</div>
  )
}