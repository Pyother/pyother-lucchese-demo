// * == Imports and constants ==
const express = require('express'),
      cors = require('cors'),
      fs = require('fs'),
      path = require('path'),
      { Liquid } = require('liquidjs');
const port = process.env.PORT || 50034;
// * =============


// * == Liquid setup ==
const engine = new Liquid({
  root: [
    path.resolve(__dirname, 'views'),
    path.resolve(__dirname, 'components'),
    path.resolve(__dirname, 'components/layout'),
    path.resolve(__dirname, 'components/content'),
  ],
  extname: '.liquid'
});
// * =============


// * == Express setup =
const app = express();
app.use(cors());
app.use(express.static(path.resolve(__dirname, 'public')));
app.engine('liquid', engine.express());
app.set('views', path.resolve(__dirname, 'views'));
app.set('view engine', 'liquid');
// * =============


// * == Routes ==
app.get('/', (req, res) => {
    const raw_products = fs.readFileSync(path.resolve(__dirname, 'data/sample.json'));
    const raw_texts = fs.readFileSync(path.resolve(__dirname, 'data/texts.json'));

    const products = JSON.parse(raw_products).products;
    const texts = JSON.parse(raw_texts);

    res.render('main', { products, texts });
});

app.get('/api/products', (req, res) => {
  const raw = fs.readFileSync(path.resolve(__dirname, 'data/sample.json'));
  res.json(JSON.parse(raw));
});
// * =============


// * App:
app.listen(port, () => console.log(`App is running on http://localhost:${port}`));
