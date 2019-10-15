const { getLogger } = require('../../../logger');
const logger = getLogger('GetUserActivityV1');

const { DynamoDB } = require('aws-sdk');
const docClient = new DynamoDB.DocumentClient({
   apiVersion: '2012-08-10',
   params: { TableName: process.env.USER_ACTIVITY_TABLE_NAME }
});

const {
   GetUserActivityV1Request,
   ValidationErrorResponse
} = require('./model');

module.exports.handler = async (event, ctx) => {
   try {
      const request = new GetUserActivityV1Request(event);
      const validationErrors = request.validate();
      if (validationErrors.length > 0) {
         return new ValidationErrorResponse(400, validationErrors);
      }

      return (await docClient
         .get({
            ConsistenRead: true,
            Key: { userId: event.userId }
         })
         .promise()).Item;
   } catch (error) {
      logger.error(error);
      throw error;
   }
};
