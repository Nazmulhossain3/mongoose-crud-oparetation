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

todoSchema.methods = {
    findActive : function(){
        return mongoose.model("Todo").find({status : "active"})
    }
}

todoSchema.statics = {
     findByMongoDb : function(){
        return this.find({ title: /mongodb/i })
     }
}


todoSchema.query = {
    byLanguage : function(language){
        return this.find({title : new RegExp(language, 'i')})
    }
}

module.exports = todoSchema