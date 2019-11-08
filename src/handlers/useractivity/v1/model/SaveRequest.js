class SaveUserActivityV1Request {
   constructor(event) {
      this.traceId = event.requestContext.requestId;
      this.userId = event.body.userId;
      this.activityDate = event.body.activityDate;
      this.eventSource = event.body.eventSource;
      this.eventType = event.body.eventType;

      const activityDate = new Date(this.activityDate);
      this.activityTimestamp = activityDate.getTime();

      // 30 days TTL
      const itemExpirationDate = new Date(activityDate.toISOString());
      itemExpirationDate.setDate(itemExpirationDate.getDate() + 30);

      // TTL timestamps are in seconds
      this.itemExpirationDateInSeconds = itemExpirationDate.getTime() / 1000;
   }

   validate() {
      const errors = [];

      if (this.userId === undefined) {
         errors.push('userId not defined');
      }

      if (this.activityDate === undefined) {
         errors.push('activityDate not defined');
      }

      if (this.eventSource === undefined) {
         errors.push('eventSource not defined');
      }

      if (this.eventType === undefined) {
         errors.push('eventType not defined');
      }

      return errors;
   }
}

module.exports = SaveUserActivityV1Request;
