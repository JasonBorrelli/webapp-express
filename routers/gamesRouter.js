import express from "express";
import prisma from "../libs/prismaClient.js";
import validateId from "../middlewares/validateId.js";
import loadGame from "../middlewares/loadGame.js";
import validateBody from "../middlewares/validateBody.js";
import { gameCreateSchema, gameUpdateSchema } from "../libs/schemas.js";

const router = express.Router();

router.get("/", async (req, res) => {
  const games = await prisma.game.findMany({
    include: { category: true },
    orderBy: { id: "asc" },
  });
  res.json(games);
});

router.get("/:id", validateId, loadGame, (req, res) => {
  res.json(req.game);
});

router.post("/", validateBody(gameCreateSchema), async (req, res) => {
  const game = await prisma.game.create({
    data: req.body,
    include: { category: true },
  });
  res.status(201).json(game);
});

router.patch(
  "/:id",
  validateId,
  loadGame,
  validateBody(gameUpdateSchema),
  async (req, res) => {
    const game = await prisma.game.update({
      where: { id: req.id },
      data: req.body,
      include: { category: true },
    });
    res.json(game);
  },
);

router.delete("/:id", validateId, loadGame, async (req, res) => {
  await prisma.game.delete({ where: { id: req.id } });
  res.status(204).send();
});

export default router;
