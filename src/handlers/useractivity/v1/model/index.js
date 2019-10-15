const GetUserActivityV1Request = require('./GetRequest');
const SaveUserActivityV1Request = require('./SaveRequest');
const { ValidationError, ValidationErrorResponse } = require('./ValidationErrorResponse');

module.exports = { ValidationError, ValidationErrorResponse, GetUserActivityV1Request, SaveUserActivityV1Request };
