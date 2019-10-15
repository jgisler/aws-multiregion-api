const { ValidationError } = require('./ValidationErrorResponse');

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
         errors.push(new ValidationError('userId not defined'));
      }

      if (!this.resource.includes('/useractivity/v1')) {
         errors.push(new ValidationError('Invalid resource path'));
      }

      if ('GET' !== this.httpMethod.toUpperCase()) {
         errors.push(new ValidationError('Invalid resource path'));
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
