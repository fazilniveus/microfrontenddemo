const { merge } = require('webpack-merge');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const commonConfig = require('./webpack.common');
const packageJson = require('../package.json');

const devConfig = {
  mode: 'development',
  output: {
    publicPath: 'http://localhost:6001/'
  },
  devServer: {
    port: 6001,
    historyApiFallback: {
      index: 'index.html',
    },
  },
  plugins: [
    new ModuleFederationPlugin({
      name: 'container',
      remotes: {
          todoApp: 'todoApp@http://localhost:5001/remoteEntry.js',
          counterApp: 'counterApp@http://localhost:5002/remoteEntry.js',
          loginmodule: 'loginmodule@http://localhost:5003/remoteEntry.js',
          headerApp:'headerApp@http://localhost:5005/remoteEntry.js'
      },
      shared: { 
          react: { singleton: true }, 
          "react-dom": { singleton: true } 
        },
    }),
  ],
};

module.exports = merge(commonConfig, devConfig);
