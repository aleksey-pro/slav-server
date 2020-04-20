# CLIENTS MANAGE SYSTEM 

http://www.xn--80aaf8admgsd3i.xn--p1acf/admin/

Для авторизации:

user: manager@slavsalon.ru pwd: 123

Настроены роли, manager - только для чтения контента.

Связанный репозиторий (панель управления администратора салона) - 

https://github.com/aleksey-pro/slav-board

## Описание

Приложение для учета посетителей салона красоты. Позволяет 
вести учет посещений, начислять и использовать бонусы. Вести оценку клиентов, на основе чего реализовывать программу лояльности.

Особенностью проекта является идентификация пользователя на базе QR-кода, нанесенного на [фирменный брелок](https://i.postimg.cc/kXz3QpzY/U2-Ft-I2l-LOH0.jpg) 

Считывание кода позволяет администратору получать моментально данные о клиенте с любого устройства, вносить изменения.

## Настройка проекта

npm i -g typescript

### development
 - git clone
 - npm install
 - cd slav-server
 - npm run start (npm run win-start on WINDOWS)

### mongo start:
- cd config
- docker-compose up -d docker-compose.yml

### first deploy
 - npm install -g pm2
 - git clone
 - cd slav-server
 - npm install --only=prod
 - cd config
 - check or edit envs in ecosystem.config.js
 - pm2 start ecosystem.config.js

### deploy on push code
 - cd slav-server
 - git pull
 - pm2 restart <process_number>

### to add new user to database
  - cd slav-server
  - npm run adduser (npm run win-adduser on WINDOWS)


// test: NODE_ENV=test nodemon --exec 'mocha --recursive -R min'
