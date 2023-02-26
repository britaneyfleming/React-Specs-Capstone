import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

import { useContext } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

import Auth from './components/Auth';
import Home from './components/Home';
import Dashboard from './components/Dashboard';
import AuthContext from './store/authContext';
import Header from './components/Header';

function App() {
  const [poses, setPoses] = useState([]);
  const [note,setNote]=useState({})
  const [selectedPose, setSelectedPose] = useState(null);

  const deleteCard=async(id)=>{
    try{
       let result= await axios.delete(
        `http://localhost:3000/deleteCard/${id}`
      );
    }catch(e){
      console.log(e)
    }
  }
  const updateCard=async(e,id)=>{
    e.preventDefault();
    try{
      let result= await axios.put(
       `http://localhost:3000/updateCard/${id}`,{notes:note[id]}
     );
   }catch(e){
     console.log(e)
   }
  }

  useEffect(() => {
    const fetchData = async () => {
      try{
      const result = await axios(
        'http://localhost:3000/loadAll/userId'
      );
     setPoses(result.data.sort((a,b)=>a-b));
     
      }catch(e){
        console.log(e)
      }
    };
    fetchData();
  }, [poses]);

  const handlePoseSelect = (pose) => {
    setSelectedPose(pose);
  };
  const authCtx = useContext(AuthContext);
  return (
    <div className="App">

   
        {poses.map((data)=>{
       
          return (<div  ><h1>{data.notes}</h1>
          <button onClick={()=>{deleteCard(data.id)}}>delete</button>
        <form onSubmit={(e)=>updateCard(e,data.id)}>
          <input placeholder='new notes' value={note[data.id]} onChange={(e)=>{
            setNote({...note,
            [data.id]:e.target.value})}} />
        <button type="submit">update</button>
        </form>
          </div>)
        }) }
       


      <Header/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/auth' element={!authCtx.token ? <Auth/> : <Navigate to='/'/>}/>
        <Route path="/dashboard" element={authCtx.token ? <Dashboard /> : <Navigate to="/auth" />}/>
        <Route path='*' element={<Navigate to='/'/>}/>
        </Routes>
      {/* <header>
        <h1>Yoga Poses</h1>
      </header>
      <main>
        <div className="pose-list">
          {poses.map((pose) => (
            <div key={pose.id} className="pose-item" onClick={() => handlePoseSelect(pose)}>
              <img src={pose.image_url} alt={pose.name} />
              <h2>{pose.name}</h2>
            </div>
          ))}
        </div>
        <div className="pose-details">
          {selectedPose ? (
            <>
              <h2>{selectedPose.name}</h2>
              <img src={selectedPose.image_url} alt={selectedPose.name} />
              <p>{selectedPose.description}</p>
            </>
          ) : (
            <p>Select a pose to see details</p>
          )}
        </div>
      </main> */}
    </div>
  );
}

export default App;

