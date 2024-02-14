const express = require('express');
const connectionFunc = require("./DatabaseConnection/database.connection")
const cors = require('cors')
const userroute = require("./Routes/users.route")
const postroute = require("./Routes/post.route")
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors())
const port = 3000;


connectionFunc();

app.get('/', (req, res) => {
    res.send('Hello World boy!');
    next();
});

app.use("/users", userroute)
app.use("/posts" , postroute)

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});
