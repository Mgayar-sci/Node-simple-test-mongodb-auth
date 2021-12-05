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

main().then(() => console.log("mongodb is connected")).catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb+srv://sa:W6Ym9SRNV8j7yhpn@cluster0.upgxv.mongodb.net/myFirstDatabase?retryWrites=true&w=majority');

  const s_exists = await Kitten.find({ name: /^Silence/ });
  
  if (!s_exists) {
    const silence = new Kitten({ name: 'Silence' });
    await silence.save();
  }

  const f_exists = await Kitten.find({ name: /^fluffy/ });

  if (!f_exists) {
    const fluffy = new Kitten({ name: 'fluffy' });
    await fluffy.save();
  }
  Kitten.find().then(k=>console.log(k));
}

const kittySchema = new mongoose.Schema({
  name: String
});

const Kitten = mongoose.model('Kitten', kittySchema);