// === CRUD OPERATIONS ===

// 1. Find all books in the "Fiction" genre
db.books.find({ genre: "Fiction" });

// 2. Find books published after the year 2000
db.books.find({ published_year: { $gt: 2000 } });

// 3. Find books by George Orwell
db.books.find({ author: "George Orwell" });

// 4. Update the price of "The Great Gatsby" to 13.99
db.books.updateOne(
  { title: "The Great Gatsby" },
  { $set: { price: 13.99 } }
);

// 5. Delete a book by its title ("Moby Dick")
db.books.deleteOne({ title: "Moby Dick" });


// === ADVANCED QUERIES ===

// 6. Find books that are both in stock and published after 2010
db.books.find({
  in_stock: true,
  published_year: { $gt: 2010 }
});

// 7. Projection: Show only title, author, and price
db.books.find(
  {},
  { _id: 0, title: 1, author: 1, price: 1 }
);

// 8. Sort books by price ascending
db.books.find().sort({ price: 1 });

// 9. Sort books by price descending
db.books.find().sort({ price: -1 });

// 10. Pagination - First page (5 books)
db.books.find().limit(5);

// 11. Pagination - Second page (next 5 books)
db.books.find().skip(5).limit(5);


// === AGGREGATION PIPELINES ===

// 12. Average price of books by genre
db.books.aggregate([
  { $group: { _id: "$genre", averagePrice: { $avg: "$price" } } }
]);

// 13. Author with the most books
db.books.aggregate([
  { $group: { _id: "$author", bookCount: { $sum: 1 } } },
  { $sort: { bookCount: -1 } },
  { $limit: 1 }
]);

// 14. Group books by publication decade and count
db.books.aggregate([
  {
    $project: {
      decade: { $concat: [ { $substr: [ "$published_year", 0, 3 ] }, "0s" ] }
    }
  },
  {
    $group: {
      _id: "$decade",
      count: { $sum: 1 }
    }
  },
  { $sort: { _id: 1 } }
]);


// === INDEXING ===

// 15. Create index on the title field
db.books.createIndex({ title: 1 });

// 16. Create compound index on author and published_year
db.books.createIndex({ author: 1, published_year: 1 });

// 17. Explain query performance (before/after index)
db.books.find({ title: "The Hobbit" }).explain("executionStats");
