const express = require('express')
const path = require('path')
const { v4: uuid} = require('uuid');
const methodOverride = require('method-override')

const app = express();
uuid();

app.use(express.urlencoded({ extended: true }));    // to access request.body & response.body
app.use(methodOverride('_method')); 
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'));

let comments = [{
    id: uuid(),
    username: "Alex",
    comment: "In paris!"
    },
    {
        id: uuid(),
        username: "Nina",
        comment: "Working this weekend! :("
    },
    {
        id: uuid(),
        username: "Justin",
        comment: "Sunny beach and cool drink! :D"
    },
    {
        id: uuid(),
        username: "Roberto",
        comment: "Weekedn football game is gonna be lit! XOXO"
    },
    {
        id: uuid(),
        username: "Thomas",
        comment: "Cycling into the woods today."
    }]



app.listen(3000, ()=>{
    console.log("Listening at Port 3000")
})



app.get('/comments', (req, res)=>{
    res.render('comments/home.ejs', {comments});
    //res.send('Working! Hello from the other side!');
})



app.get('/comments/new', (req, res)=>{
    res.render('comments/new.ejs');
})
app.post('/comments', (req, res)=>{
    const newComment = req.body;
    newComment.id = uuid();

    comments.push(newComment);
    console.log(comments);
    res.redirect('/comments')

})



app.get('/comments/:id', (req, res)=>{
    const {id} = req.params;
    const comment = comments.find(c => c.id === id);
    
    res.render('comments/show.ejs', {comment});
})



app.get('/comments/:id/edit', (req, res)=>{
    const {id} = req.params;
    const comment = comments.find(c => c.id === id)

    console.log(comment)
    res.render('comments/edit.ejs', {comment})
})
app.patch('/comments/:id', (req, res)=>{
    const {id} = req.params;
    const oldComment = comments.find(c => c.id === id)

    const newComment = req.body.newComment;
    console.log(req.body.newComment);
    
    oldComment.comment = newComment;

    res.redirect('/comments')

})



app.delete('/comments/:id', (req, res)=>{
    const {id} = req.params;
    comments = comments.filter(c => c.id !== id);
    res.redirect('/comments');
})

