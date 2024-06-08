import express from 'express';

const app = express();

app.set('view engine', 'ejs');
app.use(express.static('public'));

app.get('/', (req, res) => {
  console.log('hello');
  res.render('home.ejs');
});

app.listen(3000, () => console.log('server started'));
