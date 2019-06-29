class ConfigHelper {
   static getInstance() {
      if (ConfigHelper.instance === undefined) {
         ConfigHelper.instance = new ConfigHelper();
      }
      return ConfigHelper.instance;
   }

   constructor() {}

   createEnvFile(envName) {
      process.env.NODE_ENV = envName;
      const config = require('config');

      const envFileContent = ['#! /usr/bin/env bash'];
      envFileContent.push(...this.buildEnvConfig(config));
      envFileContent.push(`export CloudFormationParams="${this.buildCloudFormationParameters(config)}"`);
      envFileContent.push(`export TagParams="${this.buildTagParameters(config)}"`);

      console.log(`Writing .env ... done!`);
      const fs = require('fs');
      return fs.writeFileSync('./.env', envFileContent.join('\n'));
   }

   buildEnvConfig(config) {
      const envConfig = config.get('Environment');
      return Object.keys(envConfig).map(key => `export ${key}="${envConfig[key]}"`);
   }

   buildCloudFormationParameters(config) {
      const cfConfig = config.get('CloudFormation');
      return Object.keys(cfConfig)
         .map(key => `${key}=${cfConfig[key]}`)
         .join(' ');
   }

   buildTagParameters(config) {
      const tagConfig = config.get('Tags');
      return Object.keys(tagConfig)
         .map(key => `${key}=${tagConfig[key]}`)
         .join(' ');
   }
}

module.exports = ConfigHelper;
