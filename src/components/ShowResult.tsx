import { useEffect, useState } from "react"
import { Player } from "../models/player.models";



export const ShowResult = () => {

    const[jugadores, setjugadores] =useState<Player[]>([]);
    const [heights, setHeights]=useState<Player[]>([]);
    const [height, setHeight]=useState<number>(0);
    const [names, setNames] = useState<string[]>([]);

    const getHeights = async()=>{
        const response=await fetch('https://mach-eight.uc.r.appspot.com/');
        const data=await response.json();
        const {values}=data;
        setHeights(values);
    }

    const heightChange=(e:React.ChangeEvent<HTMLInputElement>)=>{
        setHeight(parseInt(e.target.value));
    }

    const pushButton=()=>{
        const players=heights.filter((player)=>height-(+player.h_in)==+player.h_in);
        setjugadores(players);
        console.log(players);
        const names1:string[]=[];
        
        for(let i=0; i<players.length; i++){
            for(let j=i+1; j<players.length-1; j++){
                names1.push(players[i].first_name + " " + players[j].first_name);
              // console.log(players[i].first_name, players[j].first_name);


              
                
            }
        }
        setNames(names1);
    }
//  const heightSum= 
  

    useEffect(()=>{
        getHeights();
    },[])
  return (
    <div>
      <input onChange={heightChange} type="number" placeholder="ingrese la altura" />
      <button onClick={pushButton}>u.u</button>
      <ul>
          {names.map((player)=>(
              <li >
                
                {player}
              </li>
              
          ))}
      </ul>
    </div>
  )
}
