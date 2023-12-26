'use client'
import Image from 'next/image'
import React, { useState } from 'react'

const Match = ({ selectedTeam }: { selectedTeam: any }) => {
  const [team, setTeam] = useState(selectedTeam[selectedTeam.length - 1])
  const [toss, setToss] = useState()
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
        className="bg-black text-white px-4 py-2 rounded-md justify-center mx-auto flex disabled:opacity-30 mt-12"
        // disabled={selectedCountrys.length !== 2}
        // onClick={() => handleToss(selectedCountrys)}
      >
        Play
      </button>
    </>
  )
}

export default Match
