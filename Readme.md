## SLAV-SERVER

### mongo start:
- cd config
- docker-compose up -d docker-compose.yml

### development
 - git clone
 - npm install
 - cd slav-server
 - npm run start

before deploy - install npm install -g pm2

### deploy
 - cd slav-server
 - git pull
 - pm2 restart <process_number>

### first deploy
 - git clone
 - cd slav-server
 - npm install --only=prod
 - cd config
 - check or edit envs in ecosystem.config.js
 - pm2 start ecosystem.config.js

### to add new user
  - cd slav-server
  - npm run adduser

test: NODE_ENV=test nodemon --exec 'mocha --recursive -R min'
