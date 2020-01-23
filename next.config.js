/* eslint-disable no-param-reassign */
// const withSass = require('@zeit/next-sass');

// module.exports = withSass();

// eslint-disable-next-line import/no-extraneous-dependencies
require('dotenv').config();

const path = require('path');

const Dotenv = require('dotenv-webpack');

module.exports = {
  serverRuntimeConfig: {
    // Will be available only on the server side
    secret: '123',
  },

  publicRuntimeConfig: {
    // This will be available on both server and client
    NProgressShowSpinner: false,
    pageTitle: process.env.PROJECT_NAME,
    pageDescription: process.env.PROJECT_DESCRIPTION,
    localStorageUserId: process.env.PROJECT_LOCAL_STORAGE_AUTHENTICATED_USER_ID,
  },

  webpack: (config) => {
    config.plugins = config.plugins || [];

    config.plugins = [
      ...config.plugins,

      new Dotenv({
        path: path.join(__dirname, '.env'),
        systemvars: true,
      }),
    ];

    return config;
  },
};
