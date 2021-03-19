// Your assignment is to define the routes below. Good luck!

const express = require("express");
const mongojs = require("mongojs");

const logger = require("morgan");

const app = express();

app.use(logger("dev"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

const databaseUrl = "warmup";
const collections = ["books"];

const db = mongojs(databaseUrl, collections);
db.on("error", error => {
  console.log("Database Error:", error);
});

// Routes
// ======

// TODO: Fill in each route so that the server performs
// the proper mongojs functions for the site to function
// -/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/

// Post a book to the mongoose database
app.post("/submit", ({ body }, res) => {
  // Save the request body as an object called book
  const book = body;

  // If we want the object to have a boolean value of false,
  // we have to do it here, because the ajax post will convert it
  // to a string instead of a boolean
  book.read = false;
  db.books.save(book, (err, saved) => {
    if(err) {
      console.log(err);
    }
    else {
      res.send(saved);
    }
  });
});

// Find all books marked as read
app.get("/read", (req, res) => {
  db.books.find({
    read: true

  }, (err,found) => {
    if(err) {
      res.send(err);
    }
    else {
      res.json(found);
    }
  })
});

// Find all books marked as unread
app.get("/unread", (req, res) => {
  db.books.find({
    read: false
  }, (err, found) => {
    if(err) {
      res.send(err);
    }
    else {
      res.json(found);
    }
  })
});

// Mark a book as having been read
app.put("/markread/:id", ({params}, res) => {
  // Remember: when searching by an id, the id needs to be passed in
  // as (mongojs.ObjectId(IdYouWantToFind))
  db.books.update({
    _id: mongojs.ObjectId(params.id)
  },
  {$set: {read: true}},
  (err, found) => {
    if(err) {
      res.send(err);
    }
    else {
      res.send(found);
    }
  })
});

// Mark a book as having been not read
app.put("/markunread/:id", ({params}, res) => {
  // Remember: when searching by an id, the id needs to be passed in
  // as (mongojs.ObjectId(IdYouWantToFind))
  db.books.update({
    _id: mongojs.ObjectId(params.id)
  },
  {$set: {read: false}},
  (err, edited) => {
    if(err) {
      res.send(err);
    }
    else {
      res.send(edited);
    }
  })
});

// Listen on port 3000
app.listen(3000, () => {
  console.log("App running on port 3000!");
});
