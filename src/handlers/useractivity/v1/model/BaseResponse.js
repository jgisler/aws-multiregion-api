class BaseResponse {
   constructor(statusCode = 200) {
      this.isBase64Encoded = false;
      this.statusCode = statusCode;
      this.headers = [{ 'Content-Type': 'application/json' }, { 'Access-Control-Allow-Origin': '*' }];
   }
}

module.exports = BaseResponse;
