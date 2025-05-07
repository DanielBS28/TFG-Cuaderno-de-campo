const app = require("./app");
const { app: configApp } = require("./config");

app.listen(configApp.PORT, () => {
  console.log(`Servidor corriendo en http://${configApp.HOST}:${configApp.PORT}`);
});
