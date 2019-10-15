#! /usr/bin/env node

try {
  createEnvFile(process.argv[2]);
  process.exit(0);
} catch (error) {
  console.error(JSON.stringify(error, null, 2));
  process.exit(1);
}

function createEnvFile(envName) {
  process.env.NODE_ENV = envName;
  const config = require("config");

  const envFileContent = ["#! /usr/bin/env bash"];
  envFileContent.push(...buildEnvConfig(config));
  envFileContent.push(
    `export CloudFormationParams="${buildCloudFormationParameters(config)}"`
  );
  envFileContent.push(`export TagParams="${buildTagParameters(config)}"`);

  console.log(`Writing .env ... done!`);
  const fs = require("fs");
  return fs.writeFileSync("./.env", envFileContent.join("\n"));
}

function buildEnvConfig(config) {
  const envConfig = config.get("Environment");
  return Object.keys(envConfig).map(key => `export ${key}="${envConfig[key]}"`);
}

function buildCloudFormationParameters(config) {
  const cfConfig = config.get("CloudFormation");
  return Object.keys(cfConfig)
    .map(key => `${key}=${cfConfig[key]}`)
    .join(" ");
}

function buildTagParameters(config) {
  const tagConfig = config.get("Tags");
  return Object.keys(tagConfig)
    .map(key => `${key}=${tagConfig[key]}`)
    .join(" ");
}
