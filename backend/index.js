const express = require("express");
const cors = require("cors")
const app = express();
require('dotenv').config();
const mainRouter = require("./routes/index")

app.use(cors());
app.use(express.json());


app.use("/api/v1",mainRouter);


app.listen(3000,()=>{
    console.log("Server is running")
})



// /api/v1/user/signup
// /api/v1/user/signin
// /api/v1/user/chnagePassword....

// /api/v1/account/transferMoney
// /api/v1/account/balance
