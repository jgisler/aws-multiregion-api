class MDC {
   constructor(ctx) {
      this.traceId = ctx.awsRequestId;
      this.appname = ctx.functionName;
      this.version = ctx.functionVersion;
   }
}

let mdc;
module.exports = (event, ctx, next) => {
   if (mdc === undefined) {
      mdc = new MDC(ctx);
   }
   return next(event, ctx);
};

module.exports.getMdc = () => mdc;
