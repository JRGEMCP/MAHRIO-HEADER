let env = 'dev'; // Default dev
let nEnv = process.env.NODE_ENV.toLowerCase();

if (nEnv === 'p' || nEnv === 'prod' || nEnv === 'production')   { env = 'prod'; }
if (nEnv === 't' || nEnv === 'test' || nEnv === 'testing')      { env = 'test'; }

module.exports = require(`./config/webpack.${env}.js`);
