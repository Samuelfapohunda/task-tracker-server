import  express from 'express'
import  colors from 'colors'
import http from 'http'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'
import cors from 'cors'
import dotenv from 'dotenv'
import   path from 'path'
import Task from '../models/Task'
import { ObjectId } from 'mongodb';



const app = express();

//Configure middleware
app.use(bodyParser.json()) 
app.use(cors())


dotenv.config({path: path.resolve ('./config/config.env')});


 mongoose.connect(process.env.MONGO_URI || '', {
 }); 

 
 const db = mongoose.connection

 db.once("open", () => {
  console.log("connected to database");
  
 })
const PORT = process.env.PORT || 2500;

//Define routes
app.get('/', async (req, res) => {
  const tasks = await Task.find();
  res.json(tasks)
})


app.post('/', async (req, res) => {
  const {name, date, reminder} = req.body;
  const task = new Task({name, date, reminder});
  await task.save(); 
  res.json(task);      
})   

app.delete('/:id', async (req, res) => {
  const taskId = req.params.id

  try {
    const task = await Task.findByIdAndDelete(taskId)
    if(!task) {
      return res.status(404).send('Task Not Found');
    } else {
      res.json({msg: 'Task Deleted'})
    }  
  } catch (err) {    
    console.error('error'); 
    res.status(500).send('Server error')
       
  }  
})    
 


 

const server = app.listen( 
  PORT, () =>  console.log( 
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`
  ) 
);

  