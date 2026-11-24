import express from "express";
import gamesRouter from "./routers/gamesRouter.js";                    // importazione del router per la sezione giochi dell'API
import errorHandler from "./middlewares/errorHandler.js";
import notFound from "./middlewares/notFound.js";

const app = express();                                                  // creazione di un'istanza dell'applicazione Express
const port = process.env.APP_PORT || 4000;                              // definizione della porta del server, con valore di default 4000 se non è specificata nella variabile d'ambiente APP_PORT

app.get("/", (req, res) => {                                            // definizione di una route per la home page dell'API
  res.send("My project's API home page!");
});


app.use(express.json());                                            //abilita il parsing di JSON per le richieste in entrata           
app.use("/games", gamesRouter);                                        // utilizzo del router per gestire le richieste alla route /games


app.use(notFound);
app.use(errorHandler);


app.listen(port, () => {                                                // avvio del server sulla porta specificata
  console.log(`Server is running on http://localhost:${port}`);
});
 