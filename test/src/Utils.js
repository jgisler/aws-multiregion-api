function pp(obj) {
   if (obj instanceof Error) {
      return `${JSON.stringify(obj, null, 2)} ${obj.stack} `;
   }
   return JSON.stringify(obj, null, 2);
}

function encodeJson(json) {
   return Buffer.from(JSON.stringify(json)).toString('base64');
}

function decodeJson(base64String) {
   return JSON.parse(Buffer.from(base64String, 'base64').toString('ascii'));
}

module.exports = { encodeJson, decodeJson };
