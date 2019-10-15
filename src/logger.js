const { createLogger, format, transports } = require('winston');

module.exports.getLogger = name =>
   createLogger({
      level: 'info',
      defaultMeta: { service: name },
      transports: [
         new transports.Console({
            format: format.combine(
               format.timestamp({
                  format: 'YYYY-MM-DD HH:mm:ss'
               }),
               format.errors({ stack: true }),
               format.splat(),
               format.json(),
               format.colorize()
            )
         })
      ]
   });
