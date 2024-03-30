const express = require('express');

const path = require('path');
const app = express();
const methodOverride = require('method-override')

const { v4: uuid} = require('uuid');
uuid();


app.use(express.urlencoded({ extended: true })) ; // to access request.body & response.body
app.use(methodOverride('_method'));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'));
//to make sure we are doing absolute path

const comments = [
    {   
        id: uuid(),
        username: 'Todd',
        comment: 'lol that is so funny!'
    },
    {   
        id: uuid(),
        username: 'Skler',
        comment: 'I like to go birdwatching with my dog'
    },
    {   
        id: uuid(),
        username: 'Sk8erBoi',
        comment: 'Plz delete your account, Todd'
    },
    {   
        id: uuid(),
        username: 'onlysayswoof',
        comment: 'woof woof woof'
    }
]


app.listen(3000, ()=>{
    console.log("Listening at Port: 3000");
})

//---------view all comments (HOME PAGE)---------
app.get('/comments', (req, res)=>{
    res.render('comments/home.ejs',{comments});
})





//-------------create new comment--------
app.get('/comments/new', (req, res)=>{
    res.render('comments/new.ejs')
})

app.post('/comments', (req, res)=>{
    const {username, comment} = req.body;
    comments.push({username, comment, id: uuid()});
    res.redirect('/comments')
})
// --------------------------------------





//--------matching ID parameter-------
app.get('/comments/:id', (req, res)=>{
    const {id} = req.params;
    const comment = comments.find(c => c.id === id) //using find we iterate id for allc omment 
    // and converting id into numbr as it in string format orgianlly

    res.render('comments/show.ejs',{comment})
})

// const objectArray = [{ name: 'John' }, { name: 'Emma' }]
// console.log( objectArray.find(e => e.name === 'John') )





// --------------editing comment--------------
app.get('/comments/:id/edit', (req, res)=>{
    const {id} = req.params;
    const comment = comments.find(c => c.id === id)
    res.render('comments/edit', { comment })
})

app.patch('/comments/:id', (req, res)=>{
    const { id } = req.params;
    // console.log(req.params);

    const newCommentText = req.body.comment;
    const foundComment = comments.find(c => c.id === id);
    // console.log(newCommentText);
    // console.log(foundComment);

    foundComment.comment = newCommentText;
    res.redirect('/comments')
})





//deleting comment
// app.delete('comments/:id', (req, res)=>{
//     const {id} = req.params;
//     const comments = comments.filter(c => c.id !== id)


// })















// app.get('*', (req, res)=>{
//     res.send("No route created for this path");
// })