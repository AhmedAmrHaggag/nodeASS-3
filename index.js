const express = require('express')

const path = require('path')


const app = express()
app.use(express.json())

const validate = (req,res,next)=>{
    const {id}=req.body
    const idx = users.findIndex((x)=>x.id===id)
    if (idx === -1){
        res.status(404)
        res.send("not found")
    } else {
        next()
    }
}

let users = [
    { id: 1, name: 'John Doe' },
    { id: 2, name: 'Alice Smith' },
    { id: 3, name: 'Bob Johnson' }
  ];

let posts = [
    { id: 1, title: 'Post 1' },
    { id: 2, title: 'Post 2' },
    { id: 3, title: 'Post 3' }
  ];




app.route('/users')
.get((req,res)=>{
    res.json(users)
})
.post(validate,(req,res)=>{
    const {id,name}=req.body
    users.push({id,name})
    res.status(201)
    res.send('added')
})
.put((req,res)=>{
    const {id,name}=req.body
    const myUser = users.find((x)=>x.id===id)
    myUser.name=name
    res.send('updated')
}).delete(validate,(req,res)=>{
    const {id}=req.body
    const idx = users.findIndex((x)=>x.id===id)
   users.splice(idx,1)
   res.send('deleted')
})

app.route('/posts')
.get((req,res)=>{
    res.json(posts)
})
.post(validate,(req,res)=>{
    const {id,name}=req.body
    posts.push({id,name})
    res.status(201)
    res.send('added')
})
.put((req,res)=>{
    const {id,name}=req.body
    const myUser = posts.find((x)=>x.id===id)
    myUser.name=name
    res.send('updated')
}).delete(validate,(req,res)=>{
    const {id}=req.body
    const idx = posts.findIndex((x)=>x.id===id)
   posts.splice(idx,1)
   res.send('deleted')
})


app.listen(3000,()=>{console.log('server is runing');})