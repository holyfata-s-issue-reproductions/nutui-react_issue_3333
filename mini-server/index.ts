import express, { type Request, type Response } from "express";
import fs from "fs";
import pathLib from "path";
import multer from "multer";
import cors from "cors";

const app = express();

app.use(cors());
app.use(multer({ dest: "./tmp/" }).any());
app.use(express.static('tmp'));

app.get("/", (_req: Request, res: Response) => {
  res.sendFile(__dirname + "/index.html");
});

app.post("/fileUpload", (req: Request, res: Response) => {
  const files = req.files as Express.Multer.File[];
  if (!files || files.length === 0) {
    res.status(400).send("No file uploaded");
    return;
  }
  const file = files[0]!;
  const filename = file.path + pathLib.parse(file.originalname).ext;
  fs.rename(file.path, filename, (err) => {
    if (err) {
      res.send(err);
    } else {
      res.send(`http://127.0.0.1:3000/${filename.replace('tmp\\', '')}`);
    }
  });
});

app.listen(3000, () => {
  console.log("express + multer 实现文件上传 http://127.0.0.1:3000");
});
