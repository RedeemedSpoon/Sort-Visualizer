import express from 'express';

//#df9720

const app = express();
const year = new Date().getFullYear();

app.set('view engine', 'ejs');
app.use(express.static('public'));

app.get('/', (req, res) => {
  res.render('home.ejs', {year, title: 'Home'});
});

app.listen(3000, () => console.log('server started'));
