const { merge } = require('webpack-merge');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const commonConfig = require('./webpack.common');
const packageJson = require('../package.json');

const devConfig = {
  mode: 'development',
  output: {
    publicPath: 'http://localhost:5003/'
  },
  devServer: {
    port: 5003,
    historyApiFallback: {
      index: '/index.html',
    },
  },
  plugins: [
    new ModuleFederationPlugin({
      name: 'loginmodule',
      filename: 'remoteEntry.js',
      exposes: {
        './LoginApp': './src/bootstrap',
      },
      shared: { 
        react: { singleton: true }, 
        "react-dom": { singleton: true } 
      },
    })
  ],
};

module.exports = merge(commonConfig, devConfig);
