'use client'
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

const MatchList = ({matches}:{matches:any}) => {
    const router = useRouter()
    const [allMatches, setAllMatches] = useState(matches)
    const [page, setPage] = useState(1)
    const [startSlice, setStartSlice] = useState(0)
    const [endSlice, setEndSlice] = useState(5)
    
    
    return (
      <>
        <div>
          {allMatches.slice(startSlice,endSlice).map((match: any) => (
            <div key={match.id} className=" p-4 flex gap-4">
              {match.team1.title} Vs {match.team2.title}
              <button onClick={() => {router.push(`/matches/${match.id}`)}} className='text-white bg-black px-2 rounded-md py-1'>View</button>
            </div>
          ))}
        </div>
        <div className='flex justify-center gap-4'>
            <button disabled={page === 1} onClick={() => {setPage(page - 1); setStartSlice(startSlice - 5); setEndSlice(endSlice - 5)}} className='disabled:opacity-30 text-white bg-black px-2 rounded-md py-1'>Previous </button>
             <div className='text-white bg-black px-2 rounded-md py-1'>{page}</div>
            <button disabled={endSlice >= allMatches.length} onClick={() => {setPage(page + 1); setStartSlice(startSlice + 5); setEndSlice(endSlice + 5)}} className='text-white disabled:opacity-30 bg-black px-2 rounded-md py-1'>Next</button>
        </div>
      </>
    );
};

export default MatchList;