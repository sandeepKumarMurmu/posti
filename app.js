const express = require("express");

const routes = require("./src/routes/index");
const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

// Basic route
app.use("/api", routes);
app.get("/",(req,res)=>{return res.send("connected")})

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
