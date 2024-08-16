const mongoose= require("mongoose");
const userSchema =mongoose.Schema({
    username:{
        type: String,
        required: [true,"Please Add the user Name"]
    },
    email:{
        type: String,
        required: [true,"Please Add the Email"],
        unique:[true,"Email Adress already Taken"]
    },
    password:{
        type: String,
        required: [true,"Please Add the user Password"]
    },
    
},
{
    timestamps:true,
        },
)
module.exports= mongoose.model("user", userSchema)