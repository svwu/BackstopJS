var version = require('../../package.json').version;

module.exports = {
  execute: function (config) {
    return new Promise((resolve, reject) => {
      console.log('Stopping backstop remote.');
      process.exit(0);
    });
  }
};
