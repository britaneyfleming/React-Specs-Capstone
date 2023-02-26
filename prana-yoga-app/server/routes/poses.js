const { Poses } = require("../models/poses");

module.exports = {
loadAllCards:async (req, res) => {
    console.log("loadAllCards")
    
    try {
        const userId  = req.params.userId;
        let foundCards= await Poses.findAll({ where: { userId:userId } })

        if(foundCards && foundCards.length>0){
            res.stateCode=200
           res.send(foundCards)
        
        }else{
            res.sendStatus(404)
        }
    
    
    }catch(e){
       
        res.sendStatus(400)
    }
    
},
addCard:async (req, res)=>{

try{
 
   const { userId,  notes} =req.body
 
     const card=await Poses.create({userId, notes})

 
   
     if(card){
  
       res.status("200").send("card has been added  successfully")
     }
  

  
  }catch(e){

    
      res.sendStatus(400);
 
  
  }


}
 
,
deleteCard:async (req, res) => {
    console.log("deleteCard")
    
    try {
        
        const cardId=req.params.cardId;
        let deleteCard= await Poses.destroy({ where: { id:cardId } })

        if(deleteCard==1){
            res.stateCode=200
           res.send("Card with id :"+cardId+" has been deleteed successfully")
        
        }else{
            res.sendStatus(404)
        }
    
    
    }catch(e){
       
        res.sendStatus(400)
    }
    
}
,
updateCard:async (req, res) => {
    try {
        
        const cardId=req.params.cardId;
        // const {notes} = req.body;
        let upadateStatus= await Poses.update(req.body , { where: { id:cardId } })

        if(upadateStatus==1){
            res.stateCode=200
           res.send("Card with id : "+cardId+" has been updated successfully")
        
        }else{
            res.sendStatus(404)
        }
    
    
    }catch(e){
       
        res.sendStatus(400)
    }
    
}


}