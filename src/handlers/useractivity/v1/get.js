const { logger, getLogger, getDynamoDocClient } = require('../../../util');
const { GetUserActivityV1Request, ErrorResponse, BaseResponse } = require('./model');

const log = getLogger(`GetUserActivityV1`);

async function handler(event, ctx, callback) {
   try {
      const request = new GetUserActivityV1Request(event);
      logger.info({ request: request });

      const validationErrors = request.validate();
      if (validationErrors.length > 0) {
         return new ErrorResponse(400, validationErrors);
      }

      const result = await getUserActivity(request.userId);
      if (result && result.Item) {
         return new BaseResponse(200, result.Item);
      }
      return new ErrorResponse(404, ['User not found']);
   } catch (error) {
      logger.error({ error: error });
      throw error;
   }
}

async function getUserActivity(userId) {
   return getDynamoDocClient()
      .get({
         ConsistenRead: true,
         Key: { userId: userId },
         TableName: process.env.USER_ACTIVITY_TABLE_NAME
      })
      .promise();
}

module.exports.handler = logger.handler(handler);
