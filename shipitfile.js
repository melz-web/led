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

  shipit.blTask('deploy:install', async () => {
    await shipit.remote(`cd ${shipit.releasePath} && yarn`);
    shipit.emit('installed');
  });

  shipit.blTask('deploy:build', async () => {
    await shipit.remote(`cd ${shipit.releasePath} && yarn run prod:build`);
    shipit.emit('built');
  });

  shipit.on('updated', async () => {
    shipit.start('deploy:install');
  });

  shipit.on('installed', async () => {
    shipit.start('deploy:build');
  });
};
