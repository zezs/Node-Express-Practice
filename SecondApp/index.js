const express =  require("express");
const app = express();

app.listen(8080, ()=>{
    console.log("working!");
})

app.get("/", (req, res)=>{
    res.send("HOME!");
})

app.get("/login", (req, res)=>{
    res.send("Login page");
})

app.get("/search/:name/:city", (req, res)=>{
    const {name, city} = req.params;
    const {age, hair} = req.query;
    res.send(`Looking for ${name} from ${city}? aged ${age} with ${hair} hair`);
})

app.get("*", (req, res)=>{
    res.send("No route defined!");
})