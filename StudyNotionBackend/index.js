const express = require("express");
const app = express();
const router = express.Router();

const courseRoutes = require("./routes/Course");
const paymentRoutes = require("./routes/Payment");
const profileRoutes = require("./routes/Profiile");
const userRoutes = require("./routes/User");

const database = require("./config/database");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const { cloudinaryConnect } = require("./config/cloudinary");
const fileUpload = require("express-fileupload");
const dotenv = require("dotenv").config();

const PORT = process.env.PORT || 3000;
//databse connect
try {
  database.connect();
} catch (error) {
  console.log(error);
}
//middle wares

app.use(express.json());
app.use(cookieParser());
//frontend connectivity
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
//file uploadation
app.use(fileUpload({}));

cloudinaryConnect();
//routes

const multer = require("multer");
const upload = multer({ dest: "uploads1/" });

router.post("/api/upload", (req, res) => {
  // res.json(req.file);
  res.json("hare krishna hare ");
});
app.use("/api/v1/auth", userRoutes);
app.use("/api/v1/profile", profileRoutes);
app.use("/api/v1/payment", paymentRoutes);
app.use("/api/v1/course", courseRoutes);

//default routes
app.get("/", (req, res) => {
  return res.json({
    sucess: true,
    message: "your server is running",
  });
});
app.listen(PORT, () => {
  console.log(`App is running ${PORT}`);
});
