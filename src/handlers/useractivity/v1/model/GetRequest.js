const { ValidationError } = require('./ErrorResponse');

class GetUserActitivityV1Request {
   constructor(event) {
      this.resource = event.resource;
      this.httpMethod = event.httpMethod;
      this.userId = event.pathParameters.userId;
      this.traceId = event.requestContext.requestId;
   }

   validate() {
      const errors = [];

      if (this.userId === undefined) {
         errors.push('userId not defined');
      }

      if (!this.resource.includes('/useractivity/v1')) {
         errors.push('Invalid resource path');
      }

      if ('GET' !== this.httpMethod.toUpperCase()) {
         errors.push('Invalid resource path');
      }

      return errors;
   }

   toString() {
      return JSON.stringify({
         resource: this.resource,
         httpMethod: this.httpMethod,
         userId: this.userId,
         traceId: this.traceId
      });
   }
}

module.exports = GetUserActitivityV1Request;
