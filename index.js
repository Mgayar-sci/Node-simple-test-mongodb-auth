//https://expressjs.com/en/starter/installing.html
//https://expressjs.com/en/starter/hello-world.html
//git init
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const bcrypt = require('bcryptjs');
dotenv.config();
const app = express();
const port = process.env.PORT || 5000;
const bodyParser = require('body-parser');
app.use(cors());
app.use(bodyParser.json());

app.listen(port, () =>
  console.log(`Server is listening at http://localhost:${port}`)
);

// https://mongoosejs.com/docs/
const mongoose = require('mongoose');
const User = require('./models/user');

main().then(() => console.log("mongodb is connected")).catch(err => console.log(err));

async function main() {
  await mongoose.connect(process.env.MONGO_URL);
}

app.post('/login', (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    error = { error: "no email or password" };
    console.log(`error`, error);
    return res.status(401).send(error);
  }

  login({ email, password })
    .then(user => {
      console.log('user', user);
      return res.status(200).send(user);
    })
    .catch(err => {
      console.log(`err`, err.message);
      return res.status(401).send({ error: err.message });
    });
});

app.get('/list', (req, res) => {
  const { limit = 10 } = req.query;

  getAllUsers(limit)
    .then(users => {
      console.log(`users`, users);
      return res.status(200).send(users);
    })
    .catch(err => {
      console.log(`err`, err);
      return res.status(404).send({ error: err.message });
    });
});

app.post('/register', (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.status(401).send({ error: "missing user data" });
  }
  addUsertoDB({ name, email, password })
    .then(user => {
      console.log(`Added user`, user);
      return res.status(200).send(user);
    })
    .catch(err => {
      console.log(`err`, err);
      return res.status(401).send({ error: err.message });
    });
});

const getAllUsers = async (n) => {
  return await (User.find().limit(n).select('-password'));
}

const addUsertoDB = async (user) => {
  //check if user exists before adding him
  const user_exists = await User.findOne({ email: user.email });
  // console.log(user_exists);
  if (!user_exists) {
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
    const new_user = new User(user);
    await new_user.save();
    new_user.password = undefined;
    return new_user;
  }

  throw new Error("email already exists");
}

const login = async (user) => {
  //check if user exists
  const existing_user = await User.findOne({ email: user.email });
  // console.log(existing_user);
  if (!existing_user) {
    throw new Error("User doesn't exist!");
  }
  if (!bcrypt.compareSync(user.password, existing_user.password)) {
    throw new Error("Login failed");
  }
  existing_user.password = undefined;
  return existing_user;
}

app.get('/', (req, res) => {
  return res.status(200).send("OK");
});

module.exports = app;