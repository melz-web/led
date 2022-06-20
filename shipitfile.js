require('./env.js');
const path = require('path');
const shipitDeploy = require('shipit-deploy');
const webpack = require('webpack');
const webpackConfig = require('./webpack.config.js');

module.exports = (shipit) => {
  shipitDeploy(shipit);
  shipit.initConfig({
    default: {
      deployTo: '/srv/led-staging.benmelz.me',
      repositoryUrl: 'https://github.com/melz-web/led.git',
    },
    staging: {
      servers: 'vps.melz.me',
    },
  });
};
