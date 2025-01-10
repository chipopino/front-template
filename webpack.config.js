const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const isProduction = process.env.NODE_ENV === 'production';

const stylesHandler = 'style-loader';

const d_root = (...args) => path.resolve(__dirname, ...args);
const d_src = (...args) => d_root('src', ...args);
const d_dist = (...args) => d_root('dist', ...args);
const d_components = (...args) => d_src('components', ...args);
const d_methods = (...args) => d_src('methods', ...args);
const d_hooks = (...args) => d_src('hooks', ...args);

const config = {
  entry: d_src('index.tsx'), // Entry file for React
  output: {
    path: d_dist(),
    filename: 'bundle.js', // Output file name
  },
  devServer: {
    open: false,
    host: 'localhost',
    port: 3000, 
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: d_src('index.html'),
      filename: 'index.html'
    })
  ],
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/i,
        loader: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.css$/i,
        use: [stylesHandler, 'css-loader', 'postcss-loader'],
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2|png|jpg|gif)$/i,
        type: 'asset',
      },
      {
        test: /\.json$/,
        use: 'json-loader',
        type: 'javascript/auto',
      },
      {
        test: /\.txt$/,
        type: 'asset/source',
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
    alias: {
      root: d_root(),
      src: d_src(),
      components: d_components(),
      methods: d_methods(),
      hooks: d_hooks(),
    }
  },
  mode: isProduction ? 'production' : 'development',
};

module.exports = config;
