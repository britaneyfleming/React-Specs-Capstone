require("dotenv").config();

const express = require("express");
const cors = require("cors");

const { PORT } = process.env;
const { sequelize } = require("./util/database");
const { register, login } = require("./controllers/auth");
const {loadAllCards,addCard,deleteCard,updateCard} =require("./routes/poses")

const app = express();

app.use(express.json());
app.use(cors());

app.post("/register", register);
app.post("/login", login);


app.post("/addCard",addCard)
app.get("/loadAll/:userId",loadAllCards)
app.delete("/deleteCard/:cardId",deleteCard)
app.put("/updateCard/:cardId",updateCard)

sequelize
    .sync({ force: true })
    .then(() => {
        app.listen(PORT, () =>
            console.log(
                `Connection successful. Server running on port ${PORT}`
            )
        );
    })
    .catch((err) => console.log(err));