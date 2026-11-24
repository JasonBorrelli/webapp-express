import prisma from "../libs/prismaClient.js";

export default async function loadGame(req, res, next) {
  const game = await prisma.game.findUnique({ where: { id: req.id } });

  if (!game) {
    return res.status(404).json({ error: `Game ${req.id} not found` });
  }

  req.game = game;
  next();
}
