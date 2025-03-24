const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
    id: {
        type : Number,
        unique : true,
    },
    name : {
        type : String,
        required : true,
    },
    age : {
        type : Number,
        required : true,
    },
    email : {
        type : String, 
        required : true,
    }
})

const studentScehma = mongoose.model("student", studentSchema);
module.exports = studentScehma;