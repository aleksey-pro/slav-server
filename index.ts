
const app = require('./src/app');

app.listen(process.env.APP_PORT, (): void => {
  console.log(`Running on port ${process.env.APP_PORT}`);
});