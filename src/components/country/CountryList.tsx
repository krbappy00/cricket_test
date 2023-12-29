'use client'
import { Country } from '@/interface/country'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import React, { useState } from 'react'

const CountryList = ({ countries }: { countries: Country }) => {
  const [selectedCountrys, setSelectedCountrys] = useState<Country[]>([])
  const router = useRouter()

  const handleSelectTeam = (country: Country) => {
    if (selectedCountrys.includes(country)) {
      setSelectedCountrys((prev) => prev.filter((c) => c.id !== country.id))
      return
    }
    if (selectedCountrys.length === 2) {
      console.log('already selected 2')
      return
    }

    console.log('country click', country)
    setSelectedCountrys((prev) => [...prev, country])
  }
  const handleToss = (selectedCountrys: Country[]) => {
    const toss = {
      team1: selectedCountrys[0],
      team2: selectedCountrys[1],
    }
    fetch('http://localhost:4000/tosss', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(toss),
    }).then((res) => {
      console.log(res)
      if (res.ok) {
        router.push('/toss')
      }
    })
  }

  return (
    <>
      {countries.map((country: Country) => (
        <div key={country.id}>
          <Image
            onClick={() => handleSelectTeam(country)}
            src={country.flag}
            alt={country.title}
            width={100}
            
            height={100}
            className={`cursor-pointer shadow-sm ${
              selectedCountrys.includes(country)
                ? 'border-[3px] border-blue-500'
                : ''
            }`}
          />
        </div>
      ))}
      <div>
        <button
          className="bg-black text-white px-4 py-2 rounded-md justify-center flex w-full disabled:opacity-30"
          disabled={selectedCountrys.length !== 2}
          onClick={() => handleToss(selectedCountrys)}
        >
          Toss
        </button>
      </div>
    </>
  )
}

export default CountryList
