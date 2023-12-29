'use client'
import { Country } from '@/interface/country'
import Image from 'next/image'
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'

const Match = ({ selectedTeam }: { selectedTeam: any }) => {
  const [team, setTeam] = useState(selectedTeam[selectedTeam.length - 1])
  const [toss, setToss] = useState<Country>()
  const router = useRouter()
  const handleMatch = async(bowl:any) =>{
      const playData = {
        teams:team,
        wonToss:bowl
      }
      fetch('http://localhost:4000/plays', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(playData),
      })
      const data =await fetch('http://localhost:4000/plays',{cache:'no-store'})
      const res = await data.json()
      if(res){
        fetch(`http://localhost:4000/tosss/${team.id}`, {
          method: 'DELETE',
        })
        router.push(`/play/${res[res.length - 1].id}`)
      }
      

      
  }
  return (
    <>
      <h1 className="flex justify-center mt-12 mb-8 text-xl font-bold">
        Select Who will Bowl
      </h1>
      <div className="flex justify-center">
        <div className="flex gap-24">
          <Image
            src={team.team1.flag}
            alt={team.title}
            onClick={() => {
              if (toss === team.team1) return
              setToss(team.team1)
            }}
            className={`'cursor-pointer' ${
              toss === team.team1 ? 'border-[3px] border-green-500' : ''
            }`}
            width={100}
            height={100}
          />
          <Image
            src={team.team2.flag}
            alt={team.title}
            onClick={() => {
              if (toss === team.team2) return
              setToss(team.team2)
            }}
            className={`'cursor-pointer' ${
              toss === team.team2 ? 'border-[3px] border-green-500' : ''
            }`}
            width={100}
            height={100}
          />
        </div>
      </div>
      <button
        disabled={!toss}
        className=" bg-black text-white px-4 py-2 rounded-md justify-center mx-auto flex disabled:opacity-30 mt-12"
        onClick={() => handleMatch(toss)}
      >
        Play
      </button>
    </>
  )
}

export default Match
