import "dotenv/config";
import express from "express";

const app = express();

app.set("view engine", "ejs");

app.use(express.static("public"));

app.get("/", (req, res) => {
  res.render("index");
});

app.listen(process.env.PORT ?? 3001, () => {
  console.log("server running at http://localhost:3000");
});
