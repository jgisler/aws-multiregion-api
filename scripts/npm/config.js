#!/usr/bin/env node

const ConfigHelper = require('../lib/ConfigHelper');

try {
   ConfigHelper.getInstance().createEnvFile(process.argv[2]);
   process.exit(0);
} catch (error) {
   console.error(JSON.stringify(error, null, 2));
   process.exit(1);
}
