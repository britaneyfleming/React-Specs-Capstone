import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

import { useContext } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

import Auth from './components/Auth';
import Home from './components/Home';
import AuthContext from './store/authContext';

function App() {
  const [poses, setPoses] = useState([]);
  const [selectedPose, setSelectedPose] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios(
        'https://your-yoga-api.com/poses'
      );
      setPoses(result.data);
    };
    fetchData();
  }, []);

  const handlePoseSelect = (pose) => {
    setSelectedPose(pose);
  };
  const authCtx = useContext(AuthContext);
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/auth' element={!authCtx.token ? <Auth/> : <Navigate to='/'/>}/>
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

