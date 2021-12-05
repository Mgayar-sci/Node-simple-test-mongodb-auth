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

  await addUsertoDB({
    name:"mohamed",
    email: "a@a.com",
    password: "newpassword"
  });
  
  const users = await User.find();
  console.log(users);
}

const addUsertoDB = async (user) =>{
  //check if user exists before adding him
  const user_exists = await User.find({email: user.email});
  console.log(user_exists);
  if(!user_exists.length){
    const new_user = new User(user);
    await new_user.save();
  }
}