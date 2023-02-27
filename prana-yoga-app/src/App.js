import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

import { useContext } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

import Auth from './components/Auth';

import Dashboard from './components/Dashboard';
import AuthContext from './store/authContext';
import Home from './components/Home';
import Poses from './components/Pose';
import Header from './components/Header';

function App() {
  const [poses, setPoses] = useState([]);
  const [userPoses,setUserPoses]=useState([])
  const authCtx = useContext(AuthContext);



  const deleteCard=async(id)=>{
    try{
       let result= await axios.delete(
        `http://localhost:3000/deleteCard/${id}`,
        {
            headers: {
                authorization: authCtx.token,
            },
        }
      
        ); 
        let poses=axios.get(`http://localhost:3000/loadAll/${authCtx.userId}`,
        {
            headers: {
                authorization: authCtx.token,
            },
        })
       setUserPoses(poses.data)
      

    }catch(e){
      console.log(e)
    }
  }

  const addCard=async(selectedCard)=>{
    axios.post(
      "http://localhost:3000/addCard/",
      {userId: authCtx.userId,notes:selectedCard},
      {
          headers: {
              authorization: authCtx.token,
          },
      }
  )
  .then(() => {
      getUserPoses();}) 
  
  }

  {/*
  const updateCard=async(e,id)=>{
    e.preventDefault();
    try{
      let result= await axios.put(
       `http://localhost:3000/updateCard/${id}`,{notes:"1"}
     );
   }catch(e){
     console.log(e)
   }
  }
*/}
 const getUserPoses = () => {
      axios
          .get(`http://localhost:3000/loadAll/${authCtx.userId}`,
          {
              headers: {
                  authorization: authCtx.token,
              },
          })
          .then((res) => setUserPoses(res.data))
          .catch((err) => console.log(err));
  }
 
  useEffect(() => {

   
    if(authCtx.userId !=""){
      axios.get("http://localhost:3000/pullPoses").then(res => setPoses(res.data))
    getUserPoses()
    }
  }, [authCtx.userId]);


  
  return (
    <div className="App">

   
  <Header/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/auth' element={!authCtx.token ? <Auth/> : <Navigate to='/'/>}/>
        <Route path="/dashboard" element={authCtx.token ? <Dashboard userPoses={userPoses} poses={poses} addCard={addCard}  deleteCard={deleteCard} getUserPoses={getUserPoses} /> : <Navigate to="/auth" />}/>
        <Route path='*' element={<Navigate to='/'/>}/>
        <Route path="/poses" element={<Poses addCard={addCard}/>}/>
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

