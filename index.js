const express = require('express');
const myApp = express();
myApp.use(express.json());

myApp.listen(3000, function() {
    console.log("API running on port 3000");
});

myApp.get('/', function(request, response) {
    response.send("Hello world!");
});

// CRUD API
// Create User
let userList = [];

myApp.post('/user', function(req, res) {
    const user = req.body.name;
    userList.push(user);
    res.send(`${user} was created succesfully!`);
});

// Read users
myApp.get('/users', (req, res) => {
    res.send(userList);
});

// Update user
myApp.put('/user/:name', (req, res) => {
    const oldName = req.params.name;
    const index = userList.indexOf(oldName);
    if(index > -1){
        const newName = req.body.newName;
        userList[index] = newName;
        res.send(`${oldName} was updated to ${newName}`);
    }
    else{
        res.status(404).send(`${oldName} not found!`);
    }
});

// Delete User

myApp.delete('/user/:name', function(req, res) {
    const name = req.params.name;
    const index = userList.indexOf(name);
    if(index > -1) {
        userList.splice(index, 1);
        res.send(`User ${name} has been deleted!`);
    }
    else{
        res.status(404).send(`User ${name} not found`);
    }
});


