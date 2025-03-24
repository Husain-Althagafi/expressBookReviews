const express = require('express');
const jwt = require('jsonwebtoken');
let books = require("./booksdb.js");
const regd_users = express.Router();

let users = [];

const isValid = (username)=>{ //returns boolean
//write code to check is the username is valid
    let userswithsamename = users.filter((user) => {
      return user.username === username
    })

    if (userswithsamename.length === 0 ) {
      return true
    }
    else {
      return false
    }

    
}

const authenticatedUser = (username,password)=>{ //returns boolean
//write code to check if username and password match the one we have in records.
let userswithsamename = users.filter((user) => {
    return user.username === username
  })

  if (userswithsamename.length === 0 ) {
    return true
  }
  else {
    return false
  }
}

//only registered users can login
regd_users.post("/login", (req,res) => {
  //Write your code here
  const username = req.body.username
  const password = req.body.password

  if (!username || !password){
    return res.status(404).json({message : "Error with logging in"})
  }
  
  if (authenticatedUser(username, password)){
    return res.status(404).json({message : "Invalid login, check credentials"})
  }

  let accessToken = jwt.sign(
    {data:password},
    'access',
    {expiresIn: 60*60}
  )
  req.session.authorization = {
    accessToken, username
  }

  return res.status(200).send("User logged in successfully")

});

// Add a book review
regd_users.put("/auth/review/:isbn", (req, res) => {
  //Write your code here
  let isbn = req.params.isbn
  let username = req.session.username
  let review = req.query.review

  if (!books[isbn]){
    return res.send('Author id doesnt exist')
  }

  books[isbn].reviews[username] = review
  console.log(books[isbn].reviews)
  return res.send("Your review has been submitted")





});

module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;
