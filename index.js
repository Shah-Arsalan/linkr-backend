const express = require('express');
const connectionFunc = require("./DatabaseConnection/database.connection")
const user = require("./models/user.model")
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const port = 3000;

connectionFunc();

app.get('/', (req, res) => {
    res.send('Hello World boy!');
    next();
});


app.get('/test', (req, res) => {
    res.send('This is a test route!');
});

app.post('/signup', async(req, res)=>{
    try {
        const { email, firstName, lastName, password } = req.body;
        console.log("email", email);
        const newUser = new user({ email, firstName, lastName, password })
        await newUser.save()
          .then((savedUser) => {
            console.log("going forward")
            res.status(201).json({ success: true, message: "User Created" })
          })
          .catch((err) => {
            console.log(err.code)
            console.log(err.code == 11000)
            if (err.code == 11000) {
              res.status(422).json({ success: false, message: "User already exists" })
              return;
            } else {
              res.status(500).json({ success: false, message: "Internal Server Error" })
              return;
            }
          })
      } catch (error) {
        res.status(500).json({ success: false, message: "Internal Server Error" })
  
      }

})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});
