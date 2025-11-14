import express from "express";
import { routes } from "./routes/index";
const app = express();

app.use(express.json())
app.use(routes);
// Inicia o servidor
app.listen(5555, () => {
  console.log(`Servidor rodando`);
});
