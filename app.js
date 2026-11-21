import express from "express";
import gamesRouter from "./routers/gamesRouter.js";                    // importazione del router per la sezione giochi dell'API

const app = express();                                                  // creazione di un'istanza dell'applicazione Express
const port = process.env.APP_PORT || 4000;                              // definizione della porta del server, con valore di default 4000 se non è specificata nella variabile d'ambiente APP_PORT

app.get("/", (req, res) => {                                            // definizione di una route per la home page dell'API
  res.send("My project's API home page!");
});


app.use(express.json());
app.use("/games", gamesRouter);                                        // utilizzo del router per gestire le richieste alla route /games

                                                // middleware per il parsing del corpo delle richieste in formato JSON

app.listen(port, () => {                                                // avvio del server sulla porta specificata
  console.log(`Server is running on http://localhost:${port}`);
});
