import express from "express";
import cors from "cors";

import pasteRouter from "./routes/paste.js";

const app = express();

app.use(express.json());
app.set("view engine", "ejs");
app.use(cors());

app.use("/paste", pasteRouter);

app.use(express.static("public"));

app.get("/", function (req, res) {
  res.render("index");
});

app.use((req, res) => res.status(404).send(`404 Not Found`));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () =>
  console.log(`Server is listening on http://localhost:${PORT}`)
);
