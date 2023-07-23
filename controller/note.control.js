const NoteModel = require('../model/Note.js')
const UserModel = require('../model/User.js')
const logger = require("../services/logger.js")
const asyncHandler = require('express-async-handler')

const createNote = async (req,res) =>{
    try{
        const note = new NoteModel(req.body);
        const result = await note.save();
        res.status(201).json({
            status: 201,
            message: 'Note created successfully',
            data: result,
        });
    }
    catch(error)
    {
        logger.error(error.message)
        res.status(400).json({
            status : 400,
            message : error.message
        });
    }
}

const showNotes = async (req,res)=>{
    try
    {
        const note = await NoteModel.find({});
        res.status(200).json({
            status : 200,
            data: note,
        });
    }
    catch(error)
    {
        logger.error(error.message)
        res.status(400).json({
            status : 400,
            message : error.message
        });        
    }
}

const showNote = async (req,res)=>{
    try
    {
        const {id} = req.params
        const note = await NoteModel.findById(id);
        if(!note){
            res.status(404).json({message:`can't find any note with ID : ${id}`})
            logger.error(`can't find any note with ID : ${id}`)
        }
        res.status(200).json({
            status : 200,
            data: note,
        });
    }
    catch(error)
    {
        logger.error(error.message)
        res.status(400).json({
            status : 400,
            message : error.message
        });        
    }
}

const updateNote = async (req,res)=>{
    try
    {
        const {id} = req.params
        const note = await NoteModel.findByIdAndUpdate(id,req.body,{
            new:true,
            runValidators:true
        });
        if(!note){
            logger.error(`can't find any note with ID : ${id}`)
            res.status(404).json({message:`can't find any note with ID : ${id}`})
        }
        res.status(200).json({
            status : 200,
            data: note,
        });
    }
    catch(error)
    {
        logger.error(error.message)
        res.status(400).json({
            status : 400,
            message : error.message
        });        
    }
}

const deleteNote = async (req,res)=>{
    try
    {
        const {id} = req.params
        const note = await NoteModel.findByIdAndDelete(id);
        if(!note){
            logger.error(error.message)
            res.status(404).json({message:`can't find any note with ID : ${id}`})
        }
        res.status(200).json({
            status : 200,
            data: note,
        });
    }
    catch(error)
    {
        logger.error(error.message)
        res.status(400).json({
            status : 400,
            message : message.error
        });        
    }
}

module.exports ={createNote, showNotes, showNote, updateNote, deleteNote};