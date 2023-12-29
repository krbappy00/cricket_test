import MatchList from '@/components/matchList/MatchList';
import React from 'react';
const getMatches = async() => {
            const data =await fetch('http://localhost:4000/matches',{cache:'no-store'})
            const res = await data.json()
            return res
        }
const page = async() => {
    const matches = await getMatches()
    return (
        <div className='flex flex-col items-center'>
            <h1 className='text-3xl'>All Match List</h1>
            
            <MatchList matches={matches}/>   
        </div>
    );
};

export default page;