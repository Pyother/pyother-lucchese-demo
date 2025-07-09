const express = require('express'),
      cors = require('cors'),
      fs = require('fs'),
      path = require('path'),
      { Liquid } = require('liquidjs');

const app = express();
const engine = new Liquid({
  root: path.resolve(__dirname, 'views'),
  extname: '.liquid'
});

app.use(cors());
app.use(express.static(path.resolve(__dirname, 'public')));
app.engine('liquid', engine.express());
app.set('views', path.resolve(__dirname, 'views'));
app.set('view engine', 'liquid');

app.get('/', (req, res) => {
    const raw = fs.readFileSync(path.resolve(__dirname, 'data/sample.json'));
    const products = JSON.parse(raw).products;
    res.render('main', { products });
});

app.get('/api/products', (req, res) => {
  const raw = fs.readFileSync(path.resolve(__dirname, 'data/sample.json'));
  res.json(JSON.parse(raw));
});

app.listen(50034, () => console.log('Server listening on port 50034'));
