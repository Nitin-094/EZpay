const mongoose = require("mongoose")

// mongoose.connect("mongodb://127.0.0.1:27017/",{
//     dbName:'DhanYatra'
// })
// .then(()=>{
//     console.log("Databse Connected")
// }).catch((e)=>{console.log(e)})

mongoose.connect(process.env.DB_CONNECTION_STRING)
.then(()=>{
    console.log("Databse Connected")
}).catch((e)=>{console.log(e)})

const userSchema = new mongoose.Schema({
    username:String,
    password:String,
    firstName:String,
    lastName:String
})

const accountSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId, // Reference to User model
        ref: 'User',
        required: true
    },
    balance: {
        type: Number,
        required: true
    }
});

const Account = mongoose.model('Account', accountSchema);
const User = mongoose.model("User", userSchema);

module.exports={
    User,
    Account
}