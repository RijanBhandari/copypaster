import { nanoid } from "nanoid";
import express from "express";
import fs from "fs";
import path from "path";

const getDbPath = path.join(process.cwd(), "db.json");

const router = express.Router();

router.post("/", (req, res) => {
  const id = nanoid();

  const code = req.body.code;
  const deleteOnRead = req.body.deleteOnRead;

  const obj = { id, code, deleteOnRead };

  const db = JSON.parse(fs.readFileSync(getDbPath, "utf-8"));

  db.push(obj);

  fs.writeFileSync(getDbPath, JSON.stringify(db));

  res.json(obj);
});

router.get("/:id", (req, res) => {
  try {
    let db = JSON.parse(fs.readFileSync(getDbPath, "utf-8"));

    const paste = db.find((paste) => paste.id === req.params.id);

    if (paste.deleteOnRead) {
      db = db.filter((paste) => paste.id !== req.params.id);
      fs.writeFileSync(getDbPath, JSON.stringify(db));
    }

    res.json(paste);
  } catch (err) {
    res.status(404).json({ message: "Not Found" });
  }
});

export default router;
