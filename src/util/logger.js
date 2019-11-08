const { createLogger, format, transports } = require('winston');
const { combine, timestamp, errors, json, colorize } = format;

let parentLogger;
function init(ctx) {
   parentLogger = createLogger({
      level: 'info',
      defaultMeta: ctx,
      transports: [
         new transports.Console({
            format: combine(colorize(), timestamp(), json(), errors({ stack: true }))
         })
      ]
   });

   return parentLogger;
}

function getLogger(className) {
   if (parentLogger === undefined) {
      throw new Error('init(ctx) must be called first');
   }
   return parentLogger.child({ class: className });
}

module.exports = { init, getLogger };
