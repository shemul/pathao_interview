module.exports = {
  /**
   * Application configuration section
   * http://pm2.keymetrics.io/docs/usage/application-declaration/
   */
  apps: [

    // First application
    {
      name: 'app',
      script: "npm",
      args: "start",
      watch: true
    }
  ]
};
