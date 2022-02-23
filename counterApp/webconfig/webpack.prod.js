const { merge } = require('webpack-merge');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const commonConfig = require('./webpack.common');

const prodConfig = {
  mode: 'production',
  output: {
    filename: '[name].[contenthash].js',
    publicPath: '/counterApp/latest/'
  },
  plugins: [
    new ModuleFederationPlugin({
      name: 'counterApp',
      filename: 'remoteEntry.js',
      exposes: {
        './CounterApp': './src/bootstrap',
      },
      shared: { 
        react: { singleton: true }, 
        "react-dom": { singleton: true } 
      },
    }),
  ],
};

module.exports = merge(commonConfig, prodConfig);
