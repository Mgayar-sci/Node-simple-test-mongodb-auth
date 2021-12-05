//https://expressjs.com/en/starter/installing.html
//https://expressjs.com/en/starter/hello-world.html
//git init
const express = require('express')
const app = express()
const port = 5000

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})

// https://mongoosejs.com/docs/
const mongoose = require('mongoose');
const User = require('./models/user');

main().then(() => console.log("mongodb is connected")).catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb+srv://sa:W6Ym9SRNV8j7yhpn@cluster0.upgxv.mongodb.net/myFirstDatabase?retryWrites=true&w=majority');
}

app.get('/login', (req, res) => {
  const { email, password } = req.query;

  if (!email || !password) {
    error = { error: "no email or password" };
    console.log(`error`, error);
    return res.status(401).send(error);
  }
  // await addUsertoDB({
  //   name: "mohamed",
  //   email: "a@a.com",
  //   password: "newpassword"
  // });

  // console.log(await getAllUsers(10));

  login({ email, password })
    .then(user => {
      console.log('user', user);
      return res.status(200).send(user);
    })
    .catch(err => {
      console.log(`err`, err.message);
      return res.status(401).send({ error: err.message });
    })
})

const getAllUsers = async (limit) => {
  return await User.find().limit(limit);
}

const addUsertoDB = async (user) => {
  //check if user exists before adding him
  const user_exists = await User.findOne({ email: user.email });
  // console.log(user_exists);
  if (!user_exists) {
    const new_user = new User(user);
    await new_user.save();
  }
}

const login = async (user) => {
  //check if user exists
  const existing_user = await User.findOne({ email: user.email });
  // console.log(existing_user);
  if (!existing_user) {
    throw new Error("User doesn't exist!");
  }
  if (existing_user.password != user.password) {
    throw new Error("Login failed");
  }
  existing_user.password = undefined;
  return existing_user;
}