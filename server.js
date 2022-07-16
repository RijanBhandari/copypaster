import express from "express";
import cors from "cors";

import pasteRouter from "./routes/paste.js";

const app = express();

app.use(express.json());

app.use(cors());

app.use("/paste", pasteRouter);

app.use((req, res) => res.send("hello, welcome"));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () =>
  console.log(`Server is listening on http://localhost:${PORT}`)
);
