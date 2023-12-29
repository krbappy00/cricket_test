'use client'
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

const PlayMatch = ({matchDetails}:{matchDetails:any}) => {
    const router = useRouter()
    const [run,setRun] = useState(0);
    const [runSecondInnings,setRunSecondInnings] = useState(0);
    const [bowl,setBowl] = useState<any>([]);
    const [bowlSecondInnings,setBowlSecondInnings] = useState<any>([]);
    useEffect(() => {
        if(bowlSecondInnings.length === 6){
            const totalRunTeam1 =
              matchDetails.wonToss.title === matchDetails.teams.team1.title
                ? runSecondInnings
                : run;
            const totalRunTeam2 =
              matchDetails.wonToss.title === matchDetails.teams.team1.title
                ? run
                : runSecondInnings;

            const match = {
              team1: matchDetails.teams.team1,
              team2: matchDetails.teams.team2,
              wonToss: matchDetails.wonToss,
              bowl: bowl,
              bowlSecondInnings: bowlSecondInnings,
              totalRunTeam1,
              totalRunTeam2,
              wonMatch:
                totalRunTeam1 > totalRunTeam2
                  ? matchDetails.teams.team1.title
                  : matchDetails.teams.team2.title,
            };
            fetch('http://localhost:4000/matches', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(match),
            })
            fetch(`http://localhost:4000/plays/${matchDetails.id}`, {
              method: 'DELETE',
              headers: {
                'Content-Type': 'application/json',
              },
              
            })
            
            console.log(match,'match')
        }
    },[bowlSecondInnings])
    const handleBowl = () => {
        function random1To6Except5() {
            
            let result = Math.floor(Math.random() * 5) + 1;
            if (result === 5) {
                return 6;
            } else {
                return result;
            }
        }
        const runs = random1To6Except5();
       
        if(bowl.length < 6){
            setRun(run + runs);
            setBowl((prev:any) => [...prev, {
                bowls:
                  prev[prev.length - 1]?.bowls !== undefined
                    ? (Math.abs(prev[prev.length - 1].bowls % 1 - 0.5) < 0.01) ? Number(1.0.toFixed(1)).toFixed(1) : parseFloat((prev[prev.length - 1].bowls + 0.1).toFixed(1))
                    : 0.1,
                run: runs,
              },]);
        } else {
            setRunSecondInnings(runSecondInnings + runs);
            setBowlSecondInnings((prev:any) => [...prev, {
                secondBowls: prev[prev.length - 1]?.secondBowls !== undefined ? (Math.abs(prev[prev.length - 1].secondBowls % 1 - 0.5) < 0.01) ? Number(1.0.toFixed(1)).toFixed(1) : parseFloat((prev[prev.length - 1].secondBowls + 0.1).toFixed(1))
                : 0.1,
            run: runs,
            }])
        }
        
        
    }
    return (
        <div className="flex flex-col items-center mt-12">
            <h1 className='text-3xl'>Lets Play Cricket</h1>
            <div className="flex justify-center gap-4">
                <h1 className='font-bold'>{matchDetails.teams.team1.title}</h1>
                 <p>Vs</p>
                <h1 className='font-bold'>{matchDetails.teams.team2.title}</h1>
            </div>
            <div>
                <h1 className=''><span className='font-bold'>{matchDetails.wonToss.title}</span> has won the toss and elected to bowl first</h1>
            </div>
            <div>Total Run {matchDetails.wonToss.title === matchDetails.teams.team1.title ? matchDetails.teams.team2.title : matchDetails.teams.team1.title}: <span className='font-bold'>{run}</span></div>
            <div>Total Run {matchDetails.wonToss.title}: <span className='font-bold'>{runSecondInnings}</span></div>            
            <button onClick={handleBowl} disabled={bowlSecondInnings.length === 6} className='bg-black text-white px-4 py-1 rounded-md mt-2 disabled:opacity-30'>Bowl</button>
            <div className='flex gap-56 mt-8 font-bold'>
                <h1>Over</h1>
                <h1>Run</h1>
            </div>
            {bowl.map((item:any,i:number) => (
                <div key={i} className='flex gap-56'>
                    <h1>{item.bowls}</h1>
                    <h1>{item.run}</h1>
                </div>
            ))}
            {bowl.length === 6 && <div className='flex gap-56 mt-2 font-bold'>
                <h1>Over</h1>
                <h1>Run</h1>
            </div>}
            {bowlSecondInnings.map((item:any,i:number) => (
                <div key={i} className='flex gap-56'>
                    <h1>{item.secondBowls}</h1>
                    <h1>{item.run}</h1>
                </div>
            ))}
            {bowlSecondInnings.length === 6 && <>{run >runSecondInnings ? <>Congratulations <span className='font-bold'>{matchDetails.wonToss.title !== matchDetails.teams.team2.title ? matchDetails.teams.team2.title : matchDetails.teams.team1.title}</span>  won the match</> : <>Congratulations <span className='font-bold'>{matchDetails.wonToss.title}</span>  won the match</>}</>}
            {bowlSecondInnings.length === 6 && <button onClick={()=> router.push('/')} className='bg-black text-white px-4 py-1 rounded-md mt-2 disabled:opacity-30'>Home</button>}
        </div>
    );
};

export default PlayMatch;