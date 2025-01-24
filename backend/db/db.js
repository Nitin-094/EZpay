import mongoose from 'mongoose';

mongoose.connect('mongodb+srv://nk_094:Nkisop%401@cluster0.scdnz.mongodb.net/paytm-user-db');

const UserSchema = new mongoose.Schema({
    //simple way of doing this shit!
    // username : String,
    // password : String,
    // firstname : String,
    // lastname : String

    //The elegant way!
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        minLength: 3,
        maxLength: 30
    },
    password: {
        type: String,
        required: true,
        minLength: 6
    },
    firstName: {
        type: String,
        required: true,
        trim: true,
        maxLength: 50
    },
    lastName: {
        type: String,
        required: true,
        trim: true,
        maxLength: 50
    }
});


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


const User = mongoose.model('User',UserSchema);

export{User,Account};