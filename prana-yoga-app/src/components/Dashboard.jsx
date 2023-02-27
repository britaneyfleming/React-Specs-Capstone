import React, { Fragment } from "react";
import axios from "axios";

import { useNavigate } from "react-router-dom";
import { useState, useContext, useCallback, useEffect } from "react";
import AuthContext from "../store/authContext";
import Card from "./Card";
const Dashboard = ({poses,userPoses,deleteCard,addCard}) => {
    const [selectedPos,setSelectedPos]=useState(1)
    const authCtx = useContext(AuthContext);
    const { token, userId } = useContext(AuthContext);
    const navigate = useNavigate(); 

    const getPoseById=(id)=>{
        for(let pos of poses){
            if(pos.id==id){
                return pos
            }
        }
    }
    const mappedPoses =userPoses && userPoses.map((pose) => {
        let p=getPoseById(pose.notes)
        console.log(p)
        return (
            <div>
               
              {p && <Card
          name={p.sanskrit_name}
          englishName={p.english_name}
          procedure={p.procedure}
          targets={p.targets}
          benefits={p.benefits}
          contraindications={p.contraindications}
          updatedAt={p.updated_at}
          image={p.image_url}
        />}
             
                <button onClick={()=>{deleteCard(pose.id)}}>delete</button>
            </div>
        );
    });
     

      
    return (
        <Fragment>
              <main>
                <form onSubmit={(e)=>{
                    e.preventDefault()
                    addCard(selectedPos)
                }}>
                    <select value={selectedPos} onChange={e=>{setSelectedPos(e.target.value)}}>
                        {poses.map((pos)=>{
                            return <option value={pos.id}>{pos.english_name}</option>
                        })}

                    </select>

                    <button>addCard</button>
                </form>
            </main>

            {mappedPoses}
        </Fragment>
    );
};

export default Dashboard;