import React, {useEffect, useState} from 'react'
import axios from 'axios'

const Pose = () => {
  const[poses, setPoses]= useState([])
useEffect(()=> {
  axios.get("http://localhost:3000/pullPoses").then(res => setPoses(res.data))
}, [])
  return (
    <div>
      <h1>Poses</h1>
      <p>sanskrit_name{poses.map(p=>{
        return <div className='cards'>
          <p>{p.sanskrit_name}</p>
          <p>{p.english_name}</p>
          <p>{p.procedure}</p>
          <p>{p.targets}</p>
          <p>{p.benefits}</p>
          <p>{p.contraindications}</p>
          <p>{p.updated_at}</p>
          <p>{p.image_url}</p>
        
        </div>
      })}</p>

    </div>
  )
}

export default Pose;