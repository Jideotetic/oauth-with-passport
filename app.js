import "dotenv/config";
import express from "express";
import { authRouter } from "./routes/auth-routes.js";
import "./config/passport.setup.js";
import pg from "pg";

const app = express();

app.set("view engine", "ejs");

app.use(express.static("public"));

export const pool = new pg.Pool({
  host: process.env.HOST,
  user: process.env.USER,
  database: process.env.DATABASE,
  password: process.env.PASSWORD,
  port: process.env.DB_PORT,
});

app.get("/", (req, res) => {
  res.render("index");
});

app.use("/auth", authRouter);

app.listen(process.env.PORT ?? 3001, () => {
  console.log("server running at http://localhost:3000");
});
