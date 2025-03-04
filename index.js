const express = require("express")
const app = express();

app.use(express.json()) // this will make sure that the body we pass in req is understable by server 

const users = []

app.post("\signup" , function(req,res){


    //this will parse the body
    const username = req.body.username ;
    const password = req.body.password;

    //this will check wether the user is already signed up or not
    if(users.find(u => u.username === username)){
        res.json({
            message: "you are already signed up"
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
        message: "you are signedIn"
    })


})

app.post("\signin" , function(req,res){
    
})

app.listen(3000);//make sure that server is listening at this port