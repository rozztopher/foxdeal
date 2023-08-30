const express = require("express");
const app = express();
const cors = require("cors");
const basicAuth = require("express-basic-auth");

app.use(cors());
app.use(
	basicAuth({
		users: { admin: "test1234TT" },
	})
);

app.post("/auth", (req, res) => {
    if(req.auth){
        console.log(req.auth)
    }
	res.send("This the home page");
});

app.listen(3006, () => console.log("starting the app"));
