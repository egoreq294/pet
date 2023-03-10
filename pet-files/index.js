import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import multer from "multer";
import fs from "fs";
import bodyParser from "body-parser";

dotenv.config();

const PORT = process.env.PORT || 5002;

const app = express();

const storage = multer.diskStorage({
  destination: (req, __, cb) => {
    if (!fs.existsSync(`static/uploads/${req.params.id || ""}`)) {
      fs.mkdirSync(`static/uploads/${req.params.id || ""}`);
    }
    cb(null, `static/uploads/${req.params.id || ""}`);
  },
  filename: (_, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });

app.use(express.json());
app.use(
  cors({
    credentials: true,
    origin: "http://localhost:3000",
  })
);
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));

app.use("/uploads", express.static("static/uploads"));

app.post("/upload/:id?", upload.single("file"), (req, res) => {
  if (req.params.id) {
    res.json({
      url: `http://localhost:${PORT}/uploads/${req.params.id}/${req.file.originalname}`,
    });
    return;
  }
  res.json({
    url: `http://localhost:${PORT}/uploads/${req.file.originalname}`,
  });
});

const start = async () => {
  try {
    app.listen(PORT, () =>
      console.log(`Server ready at http://localhost:${PORT}`)
    );
  } catch (e) {
    console.log(e);
  }
};

start();
