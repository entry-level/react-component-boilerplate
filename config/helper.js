const path = require('path');
const glob = require('glob');
const ip = require('ip').address();
const HtmlWebpackPlugin = require('html-webpack-plugin');
const BASE_DIR = path.join(__dirname, '..');

const PORT = 9001;

const helper = {
  DEV_PORT: PORT,
  DEV_IP: ip,
  DEV_HOST: `http://${ip}:${PORT}`,
  getEntries,
  getPagePlugins,
};

module.exports = helper;

function getEntries(globPath, isDev) {
  const files = glob.sync(globPath);
  const { DEV_PORT, DEV_IP } = helper;
  const devEntry = [
    'react-hot-loader/patch',
    `webpack-hot-middleware/client?path=http://${DEV_IP}:${DEV_PORT}/__webpack_hmr`,
  ];

  const entries = {};

  files.forEach(file => {
    const extname = path.extname(file);
    const basename = path.basename(file, extname);
    const entry = [ file ];
    entries[basename] = isDev ? devEntry.concat(entry) : entry;
  });
  return entries;
}

function getPagePlugins(globPath, isDev) {
  const files = glob.sync(globPath);
  return files.map(file => {
    const fileExt = path.extname(file);
    const fileBasename = path.basename(file, fileExt);
    const outputPath = path.join(BASE_DIR, 'examples');
    const filename = path.resolve(outputPath, `./${fileBasename}${fileExt}`);
    return new HtmlWebpackPlugin({
      filename,
      template: file,
      inject: 'body',
      chunks: [ path.basename(file, path.extname(file)) ],
      alwaysWriteToDisk: isDev === true,
    });
  });
}
