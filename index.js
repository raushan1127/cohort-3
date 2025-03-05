const express = require("express")
const app = express();
const jwt = require('jsonwebtoken')
const JWT_SECRET = 'randomraushansecret'

app.use(express.json()) // this will make sure that the body we pass in req is understable by server 

const users = []

app.post("/signup" , function(req,res){


    //this will parse the body
    const username = req.body.username 
    const password = req.body.password

    //this will check wether the user is already signed up or not
    if(users.find(u => u.username === username)){
        res.json({
            "message": "you are already signed up"
        })
        return;
    }

    //If user is new it will push the data to users 
    users.push({
        username: username,
        password: password
    })
    //upon successfull signing up it will return this message
    res.json({
        "message": "you are signedIn"
    })
console.log(users)

})

app.post("/signin" , function(req,res){

    //passing user details in the body 
    const username = req.body.username
    const password = req.body.password 
    
    //checking if the passed user exist in our user database or in memory variable 
    let founduser = users.find(u => u.username === username && u.password === password)

    //if found user is true then alot a jwt to this user 
    if(founduser) { 
        const token = jwt.sign({
        username: username
    },JWT_SECRET)
    res.json({
        token: token
    })
}
else {
    res.status(403).send({
        message: "invalid username and password"
    })
}

    

})


//authenticted endpoints to check wether it is returning our token or not 
app.get('/me', function(req,res){
    const token = req.headers.token
    //
    //decoding token to know the real username 
    const decodedtoken = jwt.verify(token, JWT_SECRET)
    const username = decodedtoken.username
    
    let founduser = users.find(u => u.username == username )

    if(founduser) {
        res.json({
            username: founduser.username,
            password: founduser.password
        })
    }
    else {
        res.json ({
            message: "token invalid"
        })
    }

})

app.listen(3000);//make sure that server is listening at this port