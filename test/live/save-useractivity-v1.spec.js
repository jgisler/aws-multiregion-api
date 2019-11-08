const { expect } = require('chai');

process.env.AWS_REGION = 'us-west-2';
process.env.STACK_NAME = 'aws-multiregion-api-test-us-west-2';
const rf = require('../src/ResourceFinder');
const postV1 = require('../../src/handlers/useractivity/v1/post');

describe('save-useractivity-v1.spec', () => {
   let handler;
   before(async () => {
      process.env.USER_ACTIVITY_TABLE_NAME = await rf.getUserActivityTableName();
      handler = postV1.handler;
   });

   after(() => {
      delete process.env.USER_ACTIVITY_TABLE_NAME;
   });

   it('should return the user activity', async () => {
      const result = await handler(
         {
            resource: '/useractivity/v1',
            path: '/useractivity/v1',
            httpMethod: 'POST',
            requestContext: {
               awsRequestId: 'abc-123'
            },
            body: {
               userId: 'abc-123',
               activityDate: '2019-10-13T00:00:00.000Z',
               eventSource: 'some-event-name',
               eventType: 'some-event-type'
            }
         },
         {
            awsRequestId: 'abc-123',
            functionName: 'some-func-name',
            functionVersion: 'some-func-version'
         }
      );
      expect(result).to.not.be.undefined;
   });
});
