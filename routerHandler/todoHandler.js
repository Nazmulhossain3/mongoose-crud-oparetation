const express = require('express')
const mongoose = require('mongoose')
const router = express.Router()
const todoSchema = require('../schemas/todoSchema')
const Todo = new mongoose.model("Todo", todoSchema)

// get all todo

router.get('/', async(req,res)=> {

    try {
        const data = await Todo.find({ status: "active" }).select({
            _id : 0,
            date : 0,
        }).limit(3).exec();
    
        res.status(200).json({
            result: data,
            message: "All todos retrieved successfully"
        });
    } catch (error) {
        res.status(500).json({
            error: "There was a server-side error"
        });
    }
    
    
})

// get a todo by id


router.get('/:id', async(req,res)=> {

    try {
        const data = await Todo.find({ _id : req.params.id }).exec();
    
        res.status(200).json({
            result: data,
            message: "All todos retrieved successfully"
        });
    } catch (error) {
        res.status(500).json({
            error: "There was a server-side error"
        });
    }
    
      
    
})

// post a todo

router.post('/', async(req,res)=> {
    try {
        const newTodo = new Todo(req.body);
        await newTodo.save();
        
        res.status(201).json({
            message: "Todo was inserted successfully"
        });
    } catch (err) {
        res.status(500).json({
            error: "There was a server-side error",
        });
    }

})


// post multiple todo

router.post('/all', async(req,res)=> {

    try{
        await Todo.insertMany(req.body)
        res.status(201).json({
            message: "Todos were inserted successfully"
        });
    }catch (err) {
        res.status(500).json({
            error: "There was a server-side error",
        });
    }

})
// put  todo

router.put('/:id', async(req,res)=> {

    try{
     const result =  await Todo.findByIdAndUpdate(
            {_id : req.params.id}, 
            {
            $set : {
                status : "active"
            },},
        {   
            new : true,
            useFindAndModify : false
        })

        res.status(201).json({
            message: "Todos was updated successfully"
        });
        console.log(result)
    }
    catch(err){
        res.status(500).json({
            error: "There was a server-side error",
        });}

})


// delete  todo

router.delete('/:id', async(req,res)=> {

    try {
       await Todo.deleteOne({ _id : req.params.id }).exec();
    
        res.status(200).json({
            
            message: "todo was deleted successfully"
        });
    } catch (error) {
        res.status(500).json({
            error: "There was a server-side error"
        });
    }
})


module.exports = router