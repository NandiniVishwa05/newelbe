const express = require("express");
const router = require("./routes/route");
const db = require('./db')
const app = express();
const PORT = process.env.PORT;  
const cors = require("cors");
app.use(express.json());
app.use(cors());
app.use("/", router);
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));