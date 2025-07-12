// * == Imports and constants ==
const express = require('express'),
      cors = require('cors'),
      fs = require('fs'),
      path = require('path'),
      { Liquid } = require('liquidjs');
require('dotenv').config();
const port = process.env.PORT || 50034;
const externalAPI = process.env.EXTERNAL_API;
let products, texts;
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


// * == Fetching ==
async function loadData (url) {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Response status: ${response.status}`);
  }
  const json = await response.json();
  return json;
}
// * =============


async function startServer() {
  try {
    products = await loadData(`${externalAPI}/api/products`);
    texts = await loadData(`${externalAPI}/api/texts`);   

    // * == Routes ==
    app.get('/', (req, res) => {
      res.render('main', { products, texts });
    });
    // * =============

    app.listen(port, () => console.log(`App is running on http://localhost:${port}`));

  } catch (err) {
    console.error('Błąd podczas ładowania danych:', err);
    process.exit(1); 
  }
}

startServer();