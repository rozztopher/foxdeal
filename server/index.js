require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')
const port = process.env.PORT || 5001

// app.use(cors());
app.use(cors({
  origin : 'http://localhost:3000',
  "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
  "preflightContinue": false,
  'Access-Control-Allow-Headers': 'X-Requested-With,content-type',
  'Access-Control-Allow-Credentials': true,
  "optionsSuccessStatus": 204
}));
app.use(express.json({limit:'50mb'}));
app.use("/", require("./routes/index"))
app.listen(port, () => {
  console.log(`server has started on port ${port}`)
})