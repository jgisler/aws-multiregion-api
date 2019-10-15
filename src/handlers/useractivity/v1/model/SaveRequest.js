const { ValidationError } = require('./ValidationError');

class SaveUserActivityV1Request {
   constructor(event) {
      this.traceId = event.requestContext.requestId;
      this.userId = event.userId;
      this.activityDate = event.activityDate;
      this.eventSource = event.eventSource;
      this.eventType = event.eventType;

      const activityDate = new Date(this.activityDate);
      this.activityTimestamp = activityDate.getTime();

      // 30 days TTL
      const itemExpirationDate = new Date(activityDate.toISOString());
      itemExpirationDate.setDate(itemExpirationDate.getDate() + 30);
      this.itemExpirationDateInSeconds = itemExpirationDate.getTime() / 1000;
   }

   validate() {
      const errors = [];

      if (this.userId === undefined) {
         errors.push(new ValidationError('userId not defined'));
      }

      if (this.activityDate === undefined) {
         errors.push(new ValidationError('activityDate not defined'));
      }

      if (this.eventSource === undefined) {
         errors.push(new ValidationError('eventSource not defined'));
      }

      if (this.eventType === undefined) {
         errors.push(new ValidationError('eventType not defined'));
      }

      return errors;
   }
}

module.exports = SaveUserActivityV1Request;
