const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose
  .connect("mongodb://127.0.0.1:27017/libraryDB")
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log("MongoDB connection error:", err));

// Book Schema
const bookSchema = new mongoose.Schema({
  title: String,
  author: String,
  category: String,
  publishedYear: Number,
  availableCopies: Number,
});

const Book = mongoose.model("Book", bookSchema);

// CREATE
app.post("/books", async (req, res) => {
  const book = new Book(req.body);
  await book.save();
  res.json(book);
});

// READ
app.get("/books", async (req, res) => {
  const books = await Book.find();
  res.json(books);
});

// UPDATE
app.put("/books/:id", async (req, res) => {
  const updatedBook = await Book.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.json(updatedBook);
});

// DELETE
app.delete("/books/:id", async (req, res) => {
  await Book.findByIdAndDelete(req.params.id);
  res.json({ message: "Book deleted successfully" });
});

app.listen(5000, () => {
  console.log("Backend running on port 5000");
});