const path = require('path');
const express = require('express');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');

const { DEV_PORT } = require('./helper');
const webpackConfig = require('./webpack.dev.config');
const staticPath = path.join(__dirname, '..', 'examples');

const app = express();
const compiler = webpack(webpackConfig);

app.use(
  webpackDevMiddleware(compiler, {
    hot: true,
    headers: { 'Access-Control-Allow-Origin': '*' },
  })
);

app.use(webpackHotMiddleware(compiler));
app.use('/', express.static(staticPath));

app.listen(DEV_PORT, () => {
  console.log(`Listening on port ${DEV_PORT}!`);
});
