const { Poses } = require("../models/poses");

module.exports = {
loadAllCards:async (req, res) => {
    console.log("loadAllCards")
    res.send("successfull")
    /*
    try {
        const { userId } = req.body;
        let foundCards= await User.findAll({ where: { user_id:userId } });

        if(foundCards && foundCards.length>0){
            res.stateCode=200
            res.send(foundCards)
        }

    }catch(e){
        console.log("Registration Error");
        console.log(error);
        res.sendStatus(400);
    }
    */
},
addCard:async (req, res)=>{



try{
 
   const { userId,  notes} =req.body
 
     const card=await Poses.create({userId, notes})

 
   
     if(card){
  
       res.sendStatus("200").send("card has been added  successfully")
     }else{
      res.sendStatus("400").send("failed")
     }
  

  
  }catch(e){

    
      res.sendStatus(400);
      res.send("Error happened")
  
  }


}
 




}