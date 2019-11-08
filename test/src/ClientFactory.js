const { CloudFormation, Lambda } = require('aws-sdk');

let cloudFormationClient;
function getCloudFormationClient() {
   if (cloudFormationClient === undefined) {
      cloudFormationClient = new CloudFormation({ apiVersion: '2010-05-15' });
   }
   return cloudFormationClient;
}

let lambdaClient;
function getLambdaClient() {
   if (lambdaClient === undefined) {
      lambdaClient = new Lambda({ apiVersion: '2015-03-31' });
   }
   return lambdaClient;
}

module.exports = { getCloudFormationClient, getLambdaClient };
