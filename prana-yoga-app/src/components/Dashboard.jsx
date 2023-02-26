import React, { Fragment } from "react";
import axios from "axios";

import { useNavigate } from "react-router-dom";
import { useState, useContext, useCallback, useEffect } from "react";
import AuthContext from "../store/authContext";

const Dashboard = () => {
    const authCtx = useContext(AuthContext);
    const { token, userId } = useContext(AuthContext);
    const navigate = useNavigate();
    const [poses, setPoses] = useState([]);
    const [notes,setNotes]=useState("")
    const [selectedPose, setSelectedPose] = useState(null);
   
    const handleSubmit = (e) => {
        e.preventDefault();

        axios
            .post(
                "http://localhost:3000/addCard",
                { userId, notes },
                {
                    headers: {
                        authorization: token,
                    },
                }
            )
            .then(() => {
                
                getUserPoses();}) 
            .catch((err) => console.log(err));
    };

    
    const getUserPoses = () => {
        axios
            .get(`http://localhost:3000/loadAll/${userId}`)
            .then((res) => setPoses(res.data))
            .catch((err) => console.log(err));
    }

    useEffect(() => {
        getUserPoses();
    }, []);

    const updateCard=async(e,id)=>{
        e.preventDefault();
        try{
          await axios.put(
           `http://localhost:3000/updateCard/${id}`,{notes:notes[id]}
         );
        
         getUserPoses();
       }catch(e){
         console.log(e)
       }
      }

    // const updateCard = (id) => {
    //     axios.put(`http://localhost:3000/updateCard/${id}`, {notes: !notes}, {
    //         headers: {
    //             authorization: token
    //         }
    //     })
    //         .then(() => {
    //             getUserPoses()
    //         })
    //         .catch(err => {
    //             console.log(err)
    //         })
    // }

    const deleteCard=async(id)=>{
        try{
           await axios.delete(
            `http://localhost:3000/deleteCard/${id}`
          );
          getUserPoses();
        }catch(e){
          console.log(e)
        }
      }
      
    const mappedPoses = poses.map((pose) => {
        return (
            <div>
                <h3>{pose.id}</h3>
                <h3>{pose.notes}</h3>
                <form onSubmit={(e)=>updateCard(e,pose.id)}>
          <input placeholder='new notes' value={notes[pose.id]} onChange={(e)=>{
            setNotes({...notes,
            [pose.id]:e.target.value})}} />
        <button type="submit">update</button>
        </form>
                {/* <button onClick={() => updateCard(pose.id)}> Update </button> */}
                <button onClick={()=>{deleteCard(pose.id)}}>delete</button>
            </div>
        );
    });
     
        //   {poses.map((data)=>{
         
        //     return (<div  ><h1>{data.notes}</h1>
        //     <button onClick={()=>{deleteCard(data.id)}}>delete</button>
        //   <form onSubmit={(e)=>updateCard(e,data.id)}>
        //     <input placeholder='new notes' value={note[data.id]} onChange={(e)=>{
        //       setNote({...note,
        //       [data.id]:e.target.value})}} />
        //   <button type="submit">update</button>
        //   </form>
        //     </div>)
        //   }) }

    return (
        <Fragment>
            <main>
                <form onSubmit={handleSubmit}>
                    <textarea
                        type="text"
                        placeholder="content"
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                    />
                    <button>submit</button>
                </form>
            </main>

            {mappedPoses}
        </Fragment>
    );
};

export default Dashboard;