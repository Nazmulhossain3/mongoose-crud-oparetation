const mongoose = require('mongoose')

const todoSchema = mongoose.Schema({
    title : {
        type : String,
        required : true
    },
    description : String,
  
    status : {
        type : String,
        enum : ["active", "inactive"],
        default : "active"
    },

    date : {
        type : Date,
        default : Date.now
    }
})

module.exports = todoSchema