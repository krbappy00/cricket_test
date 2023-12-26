import Match from '@/components/match/Match'
import React, { useEffect } from 'react'

async function getData() {
  const res = await fetch('http://localhost:4000/tosss', {
    cache: 'no-store',
  })

  if (!res.ok) {
    throw new Error('Failed to fetch data')
  }
  return res.json()
}
const page = async () => {
  const data = await getData()
  console.log(data, 'data==========>')
  return (
    <div>
      <Match selectedTeam={data} />
    </div>
  )
}

export default page
