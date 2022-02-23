const { merge } = require('webpack-merge');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const commonConfig = require('./webpack.common');

const domain = process.env.PRODUCTION_DOMAIN;

const prodConfig = {
  mode: 'production',
  output: {
    filename: '[name].[contenthash].js',
    publicPath: '/container/latest/'
  },
  plugins: [
    new ModuleFederationPlugin({
      name: 'container',
      remotes: {
        todoApp: `todoApp@${domain}/todoApp/latest/remoteEntry.js`,
        counterApp: `counterApp@${domain}/counterApp/latest/remoteEntry.js`,
        loginmodule: `loginmodule@${domain}/loginmodule/latest/remoteEntry.js`,
      },
      shared: { 
        react: { singleton: true }, 
        "react-dom": { singleton: true } 
      },
    }),
  ],
};

module.exports = merge(commonConfig, prodConfig);
