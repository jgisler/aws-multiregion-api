const { Logger, getDynamoDocClient } = require('../../../util');
const { SaveUserActivityV1Request, ErrorResponse } = require('./model');

let logger;
module.exports.handler = async (event, ctx) => {
   logger = Logger.init(ctx).child('SaveUserActivity.v1');
   const saveReq = new SaveUserActivityV1Request(event);
   const errors = saveReq.validate();
   if (errors.length > 0) {
      return new ErrorResponse(400, errors);
   }

   try {
      await saveUserActivity(saveReq);
      return saveReq;
   } catch (error) {
      logger.error(error);
      throw error;
   }
};

async function saveUserActivity(saveUserActivityRequest) {
   return getDynamoDocClient()
      .update({
         ConsistenRead: true,
         Key: { userId: saveUserActivityRequest.userId },
         Item: saveUserActivityRequest,
         ConditionExpression: [
            'attribute_exists(userId)',
            'userId = :userId',
            'activityTimestamp < :activityTimestamp'
         ].join(' AND '),
         UpdateExpression: 'SET activityTimestamp = :activityTimestamp',
         ExpressionAttributeValues: {
            ':userId': saveUserActivityRequest.userId,
            ':activityTimestamp': saveUserActivityRequest.activityTimestamp
         },
         TableName: process.env.USER_ACTIVITY_TABLE_NAME
      })
      .promise();
}
