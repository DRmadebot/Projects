const axios=require('axios')
const express = require('express')
const app = express()
app.use(express.json())
app.use(express.static('dist'))
require('dotenv').config()

const apiKey = process.env.VITE_SOME_KEY

app.get('/api/weather/:lat/:lng',(req,res)=>{
    const{lat,lng}=req.params
    axios
    .get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${apiKey}&units=metric`)
    .then(response=>res.json(response.data))
    .catch(()=>res.status(500).json({error:'failed to fetch weather'}))
    
})

const port = process.env.port
app.listen(port)