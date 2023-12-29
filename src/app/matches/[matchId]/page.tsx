'use client'
import { useRouter,usePathname } from 'next/navigation';
import React from 'react';

const getMatchDetails = async(matchId:any) => {
    const data =await fetch(`http://localhost:4000/matches/${matchId}`,{cache:'no-store'})
    const res = await data.json()
    return res
}

const page =async () => {
    const router = useRouter();
    const pathname = usePathname();
    const id = pathname?.split('/').pop()
    const matchDetails =await getMatchDetails(id)
    console.log(matchDetails)
    return (
        <div className="flex flex-col items-center mt-12">
            <h1 className='text-3xl'>Lets Play Cricket</h1>
            <span className='font-bold'>{matchDetails.wonMatch} won the match</span>
            <div className="flex justify-center gap-4">
                <h1 className='font-bold'>{matchDetails.team1.title}</h1>
                 <p>Vs</p>
                <h1 className='font-bold'>{matchDetails.team2.title}</h1>
            </div>
            <div>
                <h1 className=''><span className='font-bold'>{matchDetails.wonToss.title}</span> has won the toss and elected to bowl first</h1>
            </div>
            <div>Total Run {matchDetails.team1.title}: <span className='font-bold'>{matchDetails.totalRunTeam1}</span></div>
            <div>Total Run {matchDetails.team2.title}: <span className='font-bold'>{matchDetails.totalRunTeam2}</span></div>
            <div className='flex gap-56 mt-8 font-bold'>
                <h1>Over</h1>
                <h1>Run</h1>
            </div>
            {matchDetails.bowl.map((item:any,i:number) => (
                <div key={i} className='flex gap-56'>
                    <h1>{item.bowls}</h1>
                    <h1>{item.run}</h1>
                </div>
            ))}
            {matchDetails.bowl.length === 6 && <div className='flex gap-56 mt-2 font-bold'>
                <h1>Over</h1>
                <h1>Run</h1>
            </div>}
            {matchDetails.bowlSecondInnings.map((item:any,i:number) => (
                <div key={i} className='flex gap-56'>
                    <h1>{item.secondBowls}</h1>
                    <h1>{item.run}</h1>
                </div>
            ))}
            
            <button onClick={()=> router.push('/')} className='bg-black text-white px-4 py-1 rounded-md mt-2 disabled:opacity-30'>Home</button>
        </div>
    );
};

export default page;