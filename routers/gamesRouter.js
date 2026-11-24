import express from "express";
import prisma from "../libs/prismaClient.js";

const router = express.Router();

// INDEX - lista dei giochi (Read)
router.get("/", async (req, res) => {
  const limit = req.query.limit;
  const categoryId = req.query.categoryId;

  // SELECT * from game where categoryId LIMIT
  const games = await prisma.game.findMany({
    select: {
      id: true,
      name: true,
      price: true,
      category: true,
    },
    where: categoryId ? { categoryId: Number(categoryId) } : undefined,
    orderBy: { id: "asc" },
    take: limit ? Number(limit) : undefined,
  });

  res.json(games);
});

// SHOW - dettaglio di un gioco (Read)
router.get("/:id", async (req, res) => {
  const id = Number(req.params.id);

  // SELECT * from game where id = ?
  const game = await prisma.game.findUnique({
    where: { id },
    include: { category: true },
  });

  if (!game) {
    return res.status(404).json({ error: "Gioco non trovato" });
  }

  res.json(game);
});

// STORE - crea un gioco (Create)
router.post("/", async (req, res) => {
  const { name, description, price, categoryId } = req.body;

  // INSERT INTO game (...) VALUES (...)
  const game = await prisma.game.create({
    data: {
      name,
      description,
      price: Number(price),
      categoryId: Number(categoryId),
    },
    include: { category: true },
  });

  res.status(201).json(game);
});

// UPDATE - modifica un gioco (Update)
router.patch("/:id", async (req, res) => {
  const id = Number(req.params.id);
  const { name, description, price, categoryId } = req.body;

  // UPDATE game SET ... where id = ?
  const game = await prisma.game.update({
    where: { id },
    data: {
      name,
      description,
      price: price !== undefined ? Number(price) : undefined,
      categoryId: categoryId ? Number(categoryId) : undefined,
    },
    include: { category: true },
  });

  res.json(game);
});

// DESTROY - elimina un gioco (Delete)
router.delete("/:id", async (req, res) => {
  const id = Number(req.params.id);

  // DELETE from game where id = ?
  await prisma.game.delete({ where: { id } });

  res.status(204).send();
});

export default router;