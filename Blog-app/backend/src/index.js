require("dotenv").config();
const express = require("express");
const cors = require("cors");
const dbConnect = require("./db/dbConnect");
const authRoutes = require("./routes/authRoutes");
const postRoutes = require("./routes/postRoutes");

const app = express();
const PORT = process.env.PORT || 8080;

app.use(cors({ origin: "http://localhost:5173" }));
app.use(express.json());

// Kết nối Cơ sở dữ liệu
dbConnect();

// Routes (Đã sửa prefix cho khớp với Frontend)
app.use("/api/auth", authRoutes);
app.use("/api/posts", postRoutes);

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});