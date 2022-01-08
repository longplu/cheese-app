// DEPENDENCIES
require('dotenv').config();

const { PORT=3001, DATABASE_URL} = process.env;

const express = require('express');

const app = express();

const mongoose = require('mongoose');

const cors = require('cors');

const morgan = require('morgan');

// DATABASE CONNECTION
mongoose.connect(DATABASE_URL);

mongoose.connection
  .on("open", () => console.log("You are connected to MongoDB"))
  .on("close", () => console.log("You are disconnected from MongoDB"))
  .on("error", (error) => console.log(error))

// MODELS
const CheeseSchema = new mongoose.Schema({
    name: String,
    countryOfOrigin: String,
    image: String,
  })
  
  const Cheese = mongoose.model('Cheese', CheeseSchema)

// MIDDLEWARE
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

// ROUTES

// test route
app.get('/', (req, res) => {
    res.send('hello world');
});

// INDEX ROUTE
app.get('/cheese', async (req, res) => {
    try {
      // send all people
      res.json(await Cheese.find({}))
    } catch (error) {
      //send error
      res.status(400).json(error)
    }
  })
  
 // CREATE ROUTE
 app.post('/cheese', async (req, res) => {
   try {
     // send all people
     res.json(await Cheese.create(req.body))
   } catch (error) {
     //send error
     res.status(400).json(error)
   }
 })

// DELETE ROUTE
app.delete('/cheese/:id', async (req, res) => {
    try {
      // send all people
      res.json(await Cheese.findByIdAndDelete(req.params.id))
    } catch (error) {
      //send error
      res.status(400).json(error)
    }
  })

// UPDATE ROUTE
app.put('/cheese/:id', async (req, res) => {
    try {
      // send all people
      res.json(await Cheese.findByIdAndUpdate(req.params.id, req.body, { new: true }))
    } catch (error) {
      //send error
      res.status(400).json(error)
    }
  })

// LISTENER
app.listen(PORT, () => console.log(`listening on PORT ${PORT}`))
