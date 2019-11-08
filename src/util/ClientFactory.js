const { DynamoDB } = require('aws-sdk');

let dynamoDocClient;
function getDynamoDocClient() {
   if (dynamoDocClient === undefined) {
      dynamoDocClient = new DynamoDB.DocumentClient({ apiVersion: '2012-08-10' });
   }
   return dynamoDocClient;
}

module.exports = { getDynamoDocClient };
