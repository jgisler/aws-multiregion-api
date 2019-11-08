const { expect } = require('chai');

process.env.AWS_REGION = 'us-west-2';
process.env.STACK_NAME = 'aws-multiregion-api-test-us-west-2';
const rf = require('../src/ResourceFinder');
const getV1 = require('../../src/handlers/useractivity/v1/get');

describe('useractivity-v1-get.spec', () => {
   let handler;
   before(async () => {
      process.env.USER_ACTIVITY_TABLE_NAME = await rf.getUserActivityTableName();
      handler = getV1.handler;
   });

   after(() => {
      delete process.env.USER_ACTIVITY_TABLE_NAME;
   });

   it('should return the user activity', async () => {
      const result = await handler(
         {
            resource: '/useractivity/v1/{userId}',
            path: '/useractivity/v1/123',
            httpMethod: 'GET',
            pathParameters: { userId: '123' },
            requestContext: {
               awsRequestId: 'abc-123'
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
