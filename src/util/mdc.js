class MDC {
   constructor(ctx) {
      this.traceId = ctx.awsRequestId;
      this.appname = ctx.functionName;
      this.version = ctx.functionVersion;
   }
}

let mdc;
module.exports.getMdc = () => mdc;

module.exports = (event, ctx, next) => {
   mdc = new MDC(ctx);
   return next(event, ctx);
};
