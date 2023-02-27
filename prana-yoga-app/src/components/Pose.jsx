import React, {useEffect, useState} from 'react'
import axios from 'axios'
import Card from './Card'

const Pose = ({addCard}) => {
  const[poses, setPoses]= useState([])
useEffect(()=> {
  axios.get("http://localhost:3000/pullPoses").then(res => setPoses(res.data))
}, [])
  return (
    <div>
      <h1>Poses</h1>
      <div className='cards'>
        
     {poses.map(p=>{
        return (<div>
        <Card
          name={p.sanskrit_name}
          englishName={p.english_name}
          procedure={p.procedure}
          targets={p.targets}
          benefits={p.benefits}
          contraindications={p.contraindications}
          updatedAt={p.updated_at}
          image={p.image_url}
        />
        <button onClick={()=>{addCard(p.id)}}>addThisCard</button>
        </div>)
        
        
      })}</div>

    </div>
  )
}

export default Pose;