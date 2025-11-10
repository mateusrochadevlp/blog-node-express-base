import express from "express";

const app = express();

// Rota GET simples
app.get("/", (req, res) => {
  res.send("Olá! O servidor está funcionando!");
});

// Inicia o servidor
app.listen(3333, () => {
  console.log(`Servidor rodando`);
});
