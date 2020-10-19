module.exports = {
  apps: [
    {
      name: 'zchat-back',
      exec_mode: 'cluster',
      instances: '-1',
      script: 'npm',
      args: 'run start',
      autorestart: true,
    },
    {
      name: 'zchat-schedule',
      script: 'npm',
      args: 'run schedule',
      instances: 1,
      exec_mode: 'fork',
      cron_restart: '0,30 * * * *',
      watch: false,
      autorestart: false,
    },
  ],
};
