import PlayMatch from '@/components/playMatch/PlayMatch';
import React from 'react';

const page = async() => {
    const data =await fetch('http://localhost:4000/plays',{cache:'no-store'})
    const res = await data.json()
    return (
        <div>
            <PlayMatch matchDetails={res[res.length - 1]}/>
        </div>
    );
};

export default page;