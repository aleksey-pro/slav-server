module.exports = {
  apps : [{
    name: 'slavsalon-server',
    script: './dist/index.js',
    autorestart: true,
    watch: false,
    max_memory_restart: '1G',
    env: {
     'NODE_ENV'         : 'production',
     'APP_URL'          : 'http://www.xn--80aaf8admgsd3i.xn--p1acf',
     'SALON_URL'        : 'http://www.xn--80aaf8admgsd3i.xn--p1acf',
     'CLIENT_URL'       : 'http://www.xn--80aaf8admgsd3i.xn--p1acf',
     'APP_PORT'         : 3050,
     'MONGO_URI'        : 'mongodb://127.0.0.1:27017/slavsalon',
     'MONGO_USER'       : 'aleks',
     'MONGO_PASS'       : 'asd159',
     'CYPHER_SECRET'    : 'slavs',
     'SECRET_JWT_TOKEN' : 'slavsalon'
    }
  },
  {
    name: 'slavsalon-mailer',
    script: './mailer.js',
    autorestart: true,
    watch: false,
    max_memory_restart: '1G',
    env: {
      "APP_PORT"      : "4000",
      "SENDMAIL_USER" : "anxieter@gmail.com",
      "SENDMAIL_PASS" : "tdvbgkxjkbhpyzlh",
    }
  }]
};
