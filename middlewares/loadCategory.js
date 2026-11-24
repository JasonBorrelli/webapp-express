import prisma from "../libs/prismaClient.js";

export default async function loadCategory(req, res, next) {
  const category = await prisma.category.findUnique({ where: { id: req.id } });

  if (!category) {
    return res.status(404).json({ error: `Category ${req.id} not found` });
  }

  req.category = category;
  next();
}
