const logger = require('../util/logger')('remote');
const path = require('path');
const { exec } = require('child_process');
const resolve = require('resolve');
const ssws = resolve.sync('super-simple-web-server', { basedir: __dirname });

module.exports = {
  execute: function (config) {
    logger.log('Starting remote.');
    
    const MIDDLEWARE_PATH = path.resolve(config.backstop, 'remote');
    const projectPath = path.resolve(config.projectPath);
    
    return new Promise(function (res, rej) {
      logger.log(`Starting remote with: node ${ssws} ${projectPath} ${MIDDLEWARE_PATH}`);
      
      const child = exec(`node ${ssws} ${projectPath} ${MIDDLEWARE_PATH}`);
      
      child.stdout.on('data', (data) => {
        logger.log(data);
      });

      child.stdout.on('close', (data) => {
        logger.log('Backstop remote connection closed.', data);
        res(data);
      });
    });
  }
};
