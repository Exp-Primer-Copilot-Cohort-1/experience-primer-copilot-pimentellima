/* eslint-disable import/no-extraneous-dependencies */
require('dotenv').config();

module.exports = {
  apps: [
    {
      name: 'dpsystem',
      script: 'yarn',
      args: 'start',
      watch: ['.next'],
      // instances: 'max',
      // exec_mode: 'cluster',
    },
  ],
};

// pm2 start npm --name "server" -i max  -- start
