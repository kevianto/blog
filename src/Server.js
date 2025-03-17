import express from "express";
import AuthRoutes from "./routes/auth.routes.js";
import BlogRoutes from "./routes/blog.routes.js";
import ConnectToDB from "./config/db.js";

const PORT = process.env.PORT || 3000;
const app = express();
app.use(express.json());
app.get("/", (req, res) => {
  res.send("hello world");
});
app.use("/auth", AuthRoutes);
app.use("/blog", BlogRoutes);
app.listen(PORT, () => {
  console.log(`app running at http://localhost:${PORT}`);
});
ConnectToDB();
