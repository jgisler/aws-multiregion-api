const BaseResponse = require('./BaseResponse');

class ErrorResponse extends BaseResponse {
   constructor(statusCode = 500, errorMessages = []) {
      super(statusCode);
      this.body = { errors: [...errorMessages] };
   }
}

module.exports = ErrorResponse;
