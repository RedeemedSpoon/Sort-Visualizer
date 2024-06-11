import express from 'express';
import {allSorts, getExample, getInfo} from './sort.js';

const app = express();
const year = new Date().getFullYear();

app.set('view engine', 'ejs');
app.use(express.static('public'));

app.get('/', (req, res) => {
  res.render('home.ejs', {year, title: 'Home'});
});

allSorts.forEach((sortAlgo) => {
  app.get(`/${sortAlgo}`, (req, res) => {
    const data = getInfo(sortAlgo);
    const title = `${titleCase(sortAlgo)} Sort`;
    res.render('playground.ejs', {year, title, data});
  });
});

app.get('/custom', (req, res) => {
  const example = getExample()
  res.render('custom.ejs', {year, title: 'Custom Sort', example});
});

const titleCase = (word) => {
  return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
};

const handleError = (req, res, next) => {
  return res.status(404).render('error.ejs', {year, title: 'Error 404'});
};

app.use(handleError);
app.listen(3000, () => console.log('server started'));
