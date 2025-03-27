const express = require('express');
const books = require("./booksdb.js");
const isValid = require("./auth_users.js").isValid;
const users = require("./auth_users.js").users;
const axios = require('axios')
const public_users = express.Router();
public_users.use(express.json())
public_users.post("/register", (req,res) => {
    //Write your code here
    
      let username = req.body.username
      let password = req.body.password
      console.log(username + '+' + password)
  
      if (username && password){
          if (isValid(username)){
              users.push({"username" : username, "password" : password})
              res.send("User with username: " + username + " and password: " + password + " has been added!")
          }
          else {
              res.send("invalid username and password")
          }
      }
      else{
          res.send('error with username and password')
      }
  
  
  
  });



// Get the book list available in the shop
public_users.get('/', async function (req, res) {
  //Write your code here
    const fetchBooksPromise =  new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(books)
        }, 1000)
    })

    fetchBooksPromise
        .then(booksdata => {
            res.send(JSON.stringify(booksdata, null, 2))
        })
        .catch (error => {
            res.status(500).json('error getting book data')
        })

});

// Get book details based on ISBN
public_users.get('/isbn/:isbn', async function (req, res) {
  //Write your code here
    let isbn = req.params.isbn
    
    const booksByISBNPromise =  new Promise((resolve, reject) => {
        setTimeout(() => {
            const book = books[isbn]
            if (book) {
                resolve(book)
            }
            else {
                reject(new Error('book not found'))
            }
        }, 1000)
    })

    booksByISBNPromise
        .then(bookdata => {
            res.send(bookdata)
        })
        .catch(error => {
            res.send(error + "")
        })
    
    
    // let isbn = req.params.isbn

    // let book = books[isbn]

    // if (book) {
    //     res.send(JSON.stringify(books[isbn], null, 2))
    // }
    // else{
    //     res.send('This isbn doesnt correspond to a book in our system')
    // }


});
  
// Get book details based on author
public_users.get('/author/:author',async function (req, res) {
  //Write your code here

    let author = req.params.author
    const booksByAuthorPromise = new Promise((resolve, reject) => {
        setTimeout(() =>{
            let foundBooks = []
            for (let bookID in books){
                if (books[bookID].author === author){
                    foundBooks.push(books[bookID])
                }
            }

            if (foundBooks.length != 0){
                resolve(foundBooks)
            }
            else {
                reject(new Error("no books were found"))
            }
        }, 1000)
    })

    booksByAuthorPromise
        .then(foundBooks => {
        res.send(JSON.stringify(foundBooks, null, 2))
        })
        .catch (error => {
            res.send(error + '')
        })






    // let author = req.params.author
    // let foundBooks = []
    // for (let bookID in books){
    //     if (books[bookID].author === author){
    //         foundBooks.push(books[bookID])
    //     }
    // }
    // if (foundBooks.length != 0){
    //     res.send(JSON.stringify(foundBooks, null, 2))
    // }
    // else {
    //     res.send("no books were found from that author")
    // }
});

// Get all books based on title
public_users.get('/title/:title', async function (req, res) {
  //Write your code here

    let title = req.params.title
    const booksByTitlePromise = new Promise((resolve, reject) => {
        setTimeout(() => {
            let foundBooks = []
            for (let bookID in books){
                if (title === books[bookID].title){
                    foundBooks.push(books[bookID])
                }
            }

            if (foundBooks.length != 0){
                resolve(foundBooks)
            }
            else {
                reject(new Error('No books found matching the title'))
            }
        }, 1000)
    })

    booksByTitlePromise
        .then(booksdata =>{
            res.send(JSON.stringify(booksdata, null, 2))
        })
        .catch(error =>{
            res.send(error +'')
        })







//   let title = req.params.title
//   let foundBooks = []
//   for (let bookID in books){
//     let titleList = books[bookID].title.split(', ')
//       if (titleList.includes(title)){
//           foundBooks.push(books[bookID])
//       }
//   }
//   if (foundBooks.length != 0){
//       res.send(JSON.stringify(foundBooks, null, 2))
//   }
//   else {
//       res.send("no books were found with that name")
//   }
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
            res.send("The reviews for this id are " + JSON.stringify(found[0].reviews))
        }
        else {
            res.send('There are no reviews for this id')
        }
        
    }
    else{
        res.send('no book with that id found')
    }

    
});

module.exports.general = public_users;
