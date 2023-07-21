const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const routes=require("./src/routes")
dotenv.config();
const app = express();
const PORT = process.env.PORT;

//loading middlewares
app.use(express.json());
app.use(cors());


//excuting routes
 app.use(routes)

app.listen(PORT, () => {
  console.log(`app is listening on port:${PORT}`);
});

