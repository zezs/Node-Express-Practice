const express = require('express');
const app = express();

app.use(express.urlencoded({ extended: true })) 
// app.use(express.json)

app.listen(3000, ()=>{
    console.log("listening PORT: 3000");
})

app.get('/tacos', (req, res)=>{
    res.send("GET");
})

app.post('/tacos', (req, res)=>{
    const {meat, qty} = req.body;
    console.log(req.body);
    res.send(`POST ${meat}: ${qty}`);
    // res.send("POST");
})