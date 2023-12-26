import Country from '../country/CountryList'

async function getData() {
  const res = await fetch('http://localhost:4000/countrys')

  if (!res.ok) {
    throw new Error('Failed to fetch data')
  }

  return res.json()
}

export default async function Page() {
  const data = await getData()
  console.log(data)

  return (
    <>
      <div className="flex justify-center w-full mt-12">
        <h1 className="text-3xl font-bold">Lets play cricket</h1>
      </div>
      <div className="justify-items-center grid grid-cols-2 gap-4 w-[30%] mx-auto mt-8">
        <Country countries={data} />
      </div>
    </>
  )
}
