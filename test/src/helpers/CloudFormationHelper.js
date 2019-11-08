const { getCloudFormationClient } = require('../ClientFactory');

const resourceCache = new Map();

async function describeStackResource(stackName, logicalResourceId) {
   const cacheKey = `${stackName}|${logicalResourceId}`;
   if (resourceCache.has(cacheKey)) {
      return resourceCache.get(cacheKey);
   }

   const resourceDescription = await getCloudFormationClient()
      .describeStackResource({
         StackName: stackName,
         LogicalResourceId: logicalResourceId
      })
      .promise();

   if (resourceDescription) {
      resourceCache.set(cacheKey, resourceDescription.StackResourceDetail);
      return describeStackResource(stackName, logicalResourceId);
   }
   return;
}

module.exports = { describeStackResource };
