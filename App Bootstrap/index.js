const express = require('express');
const path = require('path');

const app = express();

// app.use(express.static('public'));
app.use(express.static(path.join(__dirname, 'public')));// serves images, CSS files, js files in a directory named public.
//basically serves static filess
// app.use is executed everytime the server reloads, recieves request or sends response

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'));
app.set('public', path.join(__dirname, '/app'));


app.listen(3000, ()=>{
    console.log("working");
})

app.get('/', (req, res)=>{
    res.render('home.ejs')
})

app.get('/rand', (req, res)=>{
    const num = Math.floor(Math.random()*10) + 1;
    res.render('random.ejs', { rand:num })
})

app.get('/r/:subreddit', (req, res)=>{
    const {subreddit} = req.params;
    res.render('sub.ejs', {sub: subreddit});
})

app.get('/cats', (req, res)=>{
    const cats = ['ancy', 'bella', 'claire', 'ducks'];
    res.render("cats.ejs", {cats});
})


app.get('*', (req, res)=>{
    res.send("Common message!");
})