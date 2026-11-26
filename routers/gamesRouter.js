import express from "express";
import prisma from "../libs/prismaClient.js";
import { destroy, index, show, store, update } from "../controllers/gamesController.js";

const router = express.Router();

//Utilities

const sendError = (res, status, message) =>
  res.status(status).json({
    error: message, 
    status,
  })

  const isStringValid = value => typeof value === 'string' && value.trim() !== '';


// INDEX - lista dei giochi (Read)
router.get("/", index);

// SHOW - dettaglio di un gioco (Read)
router.get("/:id", show);

// STORE - crea un gioco (Create)
router.post("/", store);

// UPDATE - modifica un gioco (Update)
router.patch("/:id", update);

// DESTROY - elimina un gioco (Delete)
router.delete("/:id", destroy);


export default router;