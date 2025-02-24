const express = require("express");
const pool = require("./config"); // Import the database connection
const cors = require("cors");
const app = express();
const PORT = 3000;
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.get("/", (req, res) => {
  pool.query("SELECT * FROM books  where is_deleted=false", (err, result) => {
    if (err) {
      console.error("Error executing query", err);
    } else {
      console.log("Query result:", result.rows);
      res.json(result.rows);
    }
  });
});
app.post("/addBook", (req, res) => {
  const { newBook } = req.body;
  pool.query(
    `insert into books(title,author,genre,publication,decs) values('${newBook.title}','${newBook.author}','${newBook.genre}','${newBook.publication}','${newBook.desc}')`,
    (err, result) => {
      if (err) {
        console.error("Error executing query", err);
      } else {
        console.log("book is added successfully");
        // res.json(result.rows);
      }
    }
  );
});
app.delete("/deleteBook/:id", (req, res) => {
  const { id } = req.params;
  pool.query(
    `update books set is_deleted=true where id=${id}`,
    (err, result) => {
      if (err) {
        console.error("Error executing delete query", err);
      } else {
        console.log("record is successfully deleted");
      }
    }
  );
});

app.post("/updateBook/:id", (req, res) => {
  const { id } = req.params;
  const currentBook = req.body;
  console.log(currentBook);
  pool.query(
    `update books set title='${currentBook.title}',author='${currentBook.author}',genre='${currentBook.genre}',publication='${currentBook.publication}',decs='${currentBook.desc}', is_deleted=false where id=${id}`,
    (err, result) => {
      if (err) {
        console.error("Error executing update query", err);
      } else {
        console.log("record is successfully updated");
      }
    }
  );
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
