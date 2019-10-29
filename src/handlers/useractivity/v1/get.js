const { mdc, getLogger } = require('../../../util');
const logger = getLogger('GetUserActivityV1');

const { DynamoDB } = require('aws-sdk');
const docClient = new DynamoDB.DocumentClient({
   apiVersion: '2012-08-10',
   params: {
      ConsistenRead: true,
      TableName: process.env.USER_ACTIVITY_TABLE_NAME
   }
});

const { GetUserActivityV1Request, ErrorResponse, ValidationErrorResponse } = require('./model');

module.exports.handler = mdc(async (event, ctx) => {
   try {
      const request = new GetUserActivityV1Request(event);
      const validationErrors = request.validate();
      if (validationErrors.length > 0) {
         return new ValidationErrorResponse(400, validationErrors);
      }

      const result = await docClient.get({ Key: { userId: event.userId } }).promise();

      if (result === undefined) {
         return new ErrorResponse(404, ['User not found']);
      }

      return result.Item;
   } catch (error) {
      logger.error(error);
      throw error;
   }
});
