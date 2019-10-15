class ErrorResponse {
   constructor(statusCode = 500, validationErrors = []) {
      this.isBase64Encoded = false;
      this.statusCode = statusCode;

      this.headers = [
         { 'Content-Type': 'application/json' },
         { 'Access-Control-Allow-Origin': '*' }
      ];

      this.body = {
         errors: [...validationErrors]
      };
   }
}

class ValidationError {
   constructor(fieldName, message) {
      this.fieldName = fieldName;
      this.message = message;
   }
}

module.exports = { ValidationErrorResponse, ValidationError };
