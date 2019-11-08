const { encodeJson } = require('../Utils');
const { getLambdaClient } = require('../ClientFactory');

const resourceCache = new Map();

async function getFunctionConfiguration(functionName) {
   if (resourceCache.has(functionName)) {
      return resourceCache.get(functionName);
   }

   const funcConfig = await getLambdaClient()
      .getFunctionConfiguration({ FunctionName: functionName })
      .promise();

   if (funcConfig) {
      resourceCache.set(functionName, funcConfig);
      return resourceCache.get(functionName);
   }
   return;
}

module.exports = { getFunctionConfiguration };
