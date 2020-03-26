module.exports = {
  apps: [{
    name: 'slav-server',
    cwd: __dirname,
    script: './src/index.js',
    watch: false,
    max_memory_restart: '1G',
    ignore_watch: ['node_modules', '.git'],
    env: {
     'NODE_ENV'      : 'production',
     'APP_URL'       : 'http://www.xn--80aaf8admgsd3i.xn--p1acf',
     'CLIENT_URL'    : 'http://www.xn--80aaf8admgsd3i.xn--p1acf',
     'APP_PORT'      : 3050,
     'MONGO_URI'     : 'mongodb://slav-mongo:27017/slavsalon',
     'CYPHER_SECRET' : 'slavs'
    }
  }]
};
