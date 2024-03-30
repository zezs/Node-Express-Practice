const express = require("express");
const app = express();
// console.dir(app);

// app.use((req, res)=>{
//     console.log("We got a request!");
//     res.send('<h1> This is my Web page </h1>');
// })



app.get('/', (req, res)=>{
    res.send("Home updated")
})

app.get('/dogs', (req, res)=>{
    res.send("Bark!")
})

app.get('/cats', (req, res)=>{
    res.send("Mewo!")
})

app.post('/cats', (req, res)=>{
    res.send("Cats but post")
})

app.get('/search/:keyword', (req, res) => {
    const {keyword} = req.params;

    console.dir(req);
    res.send(`<h1> Browsing the query: <i>${keyword}`);
})

app.get('/search', (req, res) => {
    console.log(req.query);
    res.send("HI");
})




app.get('*', (req, res)=>{
    res.send("I dont know that path");
})

app.listen(3000, ()=> {
    console.log("Listening on Port 3000!");
})
