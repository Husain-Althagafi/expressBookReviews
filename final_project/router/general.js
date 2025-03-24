const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req,res) => {
  //Write your code here
  return res.status(300).json({message: "Yet to be implemented"});
});

// Get the book list available in the shop
public_users.get('/',function (req, res) {
  //Write your code here
  res.send(JSON.stringify(books, null, 2)); // 2 spaces for indentation
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
  //Write your code here
    let isbn = req.params.isbn

    let book = books[isbn]

    if (book) {
        res.send(JSON.stringify(books[isbn], null, 2))
    }
    else{
        res.send('This isbn doesnt correspond to a book in our system')
    }


});
  
// Get book details based on author
public_users.get('/author/:author',function (req, res) {
  //Write your code here
    let author = req.params.author
    let foundBooks = []
    for (let bookID in books){
        if (books[bookID].author === author){
            foundBooks.push(books[bookID])
        }
    }
    if (foundBooks.length != 0){
        res.send(JSON.stringify(foundBooks, null, 2))
    }
    else {
        res.send("no books were found from that author")
    }
});

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
  //Write your code here
  let title = req.params.title
  let foundBooks = []
  for (let bookID in books){
    let titleList = books[bookID].title.split(', ')
      if (titleList.includes(title)){
          foundBooks.push(books[bookID])
      }
  }
  if (foundBooks.length != 0){
      res.send(JSON.stringify(foundBooks, null, 2))
  }
  else {
      res.send("no books were found with that name")
  }
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
  //Write your code here
    let isbn = req.params.isbn
    let found = []
    for (let id in books){
        console.log(id + '-' + isbn)
        if (id === isbn){
            found.push(books[id])
        }
    }
    console.log('the found list is ' + found.length)
    if (found.length != 0){
        let foundID = found[0]
        if (foundID.reviews){
            res.send("The reviews for the author are " + found[0].reviews)
        }
        else {
            res.send('There are no reviews for this author')
        }
        
    }
    else{
        res.send('no book with that id found')
    }

    
});

module.exports.general = public_users;
