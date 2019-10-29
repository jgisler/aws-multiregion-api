const { getLogger } = require('../../../util/logger');
const logger = getLogger('GetUserActivityV1');

const {
   SaveUserActivityV1Request,
   ValidationErrorResponse
} = require('./model');

const { DynamoDB } = require('aws-sdk');
const docClient = new DynamoDB.DocumentClient({
   apiVersion: '2012-08-10',
   params: {
      TableName: process.env.USER_ACTIVITY_TABLE_NAME
   }
});

module.exports.handler = async (event, ctx) => {
   const saveReq = new SaveUserActivityV1Request(event);
   const errors = saveReq.validate();
   if (errors.length > 0) {
      return new ValidationErrorResponse(400, errors);
   }

   try {
      return (await docClient
         .update({
            Item: saveReq,
            ConsistenRead: true,
            ConditionExpression:
               'userId = :userId AND activityTimestamp < :activityTimestamp',
            UpdateExpression: 'SET activityTimestamp = :activityTimestamp, ',
            ExpressionAttributeValues: {
               ':userId': saveReq.userId,
               ':activityTimestamp': saveReq.activityTimestamp
            }
         })
         .promise()).Item;
   } catch (error) {
      logger.error(error);
      throw error;
   }
};
