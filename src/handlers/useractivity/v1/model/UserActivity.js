class UserActivity {
   constructor(userId, activityDate, activitySource, activityType) {
      this.userId = userId;
      this.activityDate = activityDate;
      this.activitySource = activitySource;
      this.activityType = activityType;
   }
}

module.exports = UserActivity;
