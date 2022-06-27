require('./env.js');
const path = require('path');
const shipitDeploy = require('shipit-deploy');
const webpack = require('webpack');
const webpackConfig = require('./webpack.config.js');

module.exports = (shipit) => {
  shipitDeploy(shipit);
  shipit.initConfig({
    default: {
      repositoryUrl: 'https://github.com/melz-web/led.git',
      branch: 'main'
    },
    production: {
      deployTo: '/srv/led.benmelz.me',
      asUser: 'led',
      servers: [
        {
          host: 'vps.melz.me',
          user: 'root'
        }
      ],
    },
  });

  shipit.blTask('build', async () => {
    await new Promise((resolve, reject) => {
      webpack(webpackConfig({ production: true }), (err, stats) => {
        if (err || stats.hasErrors())
          return reject(err);
        resolve(stats);
      });
    });
    shipit.emit('built');
  });

  shipit.on('deploy', async () => {
    shipit.start('build');
  });
};
