const { merge } = require('webpack-merge');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const commonConfig = require('./webpack.common');
const packageJson = require('../package.json');

const devConfig = {
  mode: 'development',
  output: {
    publicPath: 'http://localhost:5002/'
  },
  devServer: {
    port: 5002,
    historyApiFallback: {
      index: '/index.html',
    },
  },
  plugins: [
    new ModuleFederationPlugin({
      name: 'counterApp',
      filename: 'remoteEntry.js',
      exposes: {
        './CounterApp': './src/bootstrap.js',
      },
      shared: { 
          react: { singleton: true }, 
          "react-dom": { singleton: true } 
        },
    }),
  ],
};

module.exports = merge(commonConfig, devConfig);
