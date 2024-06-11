import express from 'express';
import * as fs from 'node:fs/promises';

const app = express();
const year = new Date().getFullYear();

const comparisonSort = ['heap', 'merge', 'tim', 'quick', 'shell', 'bubble', 'insertion', 'cocktail', 'gnome', 'pancake', 'selection'];
const nonComparisonSort = ['pigeonhole', 'radix', 'counting', 'bucket', 'flash'];
const otherSort = ['bead', 'spaghetti', 'bitonic', 'bogo', 'stooge'];
const allSorts = [...comparisonSort, ...nonComparisonSort, ...otherSort];

app.set('view engine', 'ejs');
app.use(express.static('public'));

app.get('/', (req, res) => {
  const title = 'Home';
  res.render('home.ejs', {year, title});
});

allSorts.forEach((sortAlgo) => {
  app.get(`/${sortAlgo}`, async (req, res) => {
    const data = await getInfo(sortAlgo);
    const title = data['Name'];
    res.render('playground.ejs', {year, title, data});
  });
});

app.get('/custom', async (req, res) => {
  const example = await getInfo('custom');
  const title = 'Custom Sort';
  res.render('custom.ejs', {year, title, example});
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
app.listen(3000, () => console.log('server started'));
