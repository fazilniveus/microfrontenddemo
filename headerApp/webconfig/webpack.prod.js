const { merge } = require('webpack-merge');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const packageJson = require('../package.json');
const commonConfig = require('./webpack.common');

const prodConfig = {
  mode: 'production',
  output: {
    filename: '[name].[contenthash].js',
    publicPath: '/loginmodule/latest/'
  },
  plugins: [
    new ModuleFederationPlugin({
      name: 'headerApp',
      filename: 'remoteEntry.js',
      exposes: {
        './HeaderApp': './src/bootstrap',
      },
      shared: { 
        react: { singleton: true }, 
        "react-dom": { singleton: true } 
      },
    }),
  ],
};

module.exports = merge(commonConfig, prodConfig);
