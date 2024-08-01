import express from 'express';
import * as fs from 'node:fs/promises';

const app = express();
const year = new Date().getFullYear();

const legends = [{orange: 'Compare'}, {blue: 'Swap'}, {red: 'Flip'}, {yellow: 'Shuffle'}, {green: 'Done'}];
const comparisonSort = ['heap', 'merge', 'tim', 'quick', 'shell', 'bubble', 'insertion', 'cocktail', 'gnome', 'pancake', 'selection'];
const nonComparisonSort = ['pigeonhole', 'radix', 'counting', 'bucket', 'flash'];
const otherSort = ['bead', 'spaghetti', 'bitonic', 'bogo', 'slow'];
const allSorts = [...comparisonSort, ...nonComparisonSort, ...otherSort];

app.set('view engine', 'ejs');
app.use(express.static('public'));

app.get('/', (req, res) => {
  const title = 'Home';
  res.render('home.ejs', {year, title});
});

allSorts.forEach((sortAlgo) => {
  app.get(`/${sortAlgo}-sort`, async (req, res) => {
    const data = await getInfo(sortAlgo);
    const title = data['Name'];
    res.render('playground.ejs', {year, title, data});
  });
});

app.get('/custom', async (req, res) => {
  const title = 'Custom';
  res.render('custom.ejs', {year, title, legends});
});

app.get('/random', (req, res) => {
  const randomNumber = Math.floor(Math.random() * allSorts.length);
  const algo = allSorts[randomNumber];
  res.redirect(`/${algo}-sort`);
});

const getInfo = async (algo) => {
  const file = `algorithms/${algo}.json`;
  const data = await fs.readFile(file, 'utf8');
  return JSON.parse(data);
};

const handleError = (req, res, next) => {
  const title = 'Error 404';
  return res.status(404).render('error.ejs', {year, title});
};

app.use(handleError);
app.listen(process.env.PORT || 3000, () => console.log('server started'));
