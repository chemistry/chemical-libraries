const path = require('path');
const webpackConfig = require('./webpack.config.base');

module.exports = function (config) {

  config.set({

    browsers: ['PhantomJS'],

    files: [
      'tests.webpack.js'
    ],

    frameworks: [
        'jasmine'
    ],

    preprocessors: {
        'tests.webpack.js': ['webpack']
    },

    colors: true,

    reporters: ['progress', 'mocha'],

    webpack:  Object.assign({} , webpackConfig, {
        devtool: false
    })
  });
};
