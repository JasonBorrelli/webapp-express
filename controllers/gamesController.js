import prisma from "../libs/prismaClient.js";



const sendError = (res, status, message) =>
  res.status(status).json({
    error: message, 
    status,
  })

  const isStringValid = value => typeof value === 'string' && value.trim() !== '';

export async function index(req, res) { 
  
  const limit = req.query.limit;
  const categoryId = req.query.categoryId;              // const  

  // SELECT * from game where categoryId LIMIT
  const games = await prisma.game.findMany({
    select: {
      id: true,
      name: true,
      price: true,
      category: true,
    },
    where: categoryId ? { categoryId: Number(categoryId) } : undefined,
    take: limit ? Number(limit) : undefined,
  });

  res.json(games);}

export async function show(req, res) {   const id = Number(req.params.id);

  if (!Number.isInteger(id)) {
    return sendError(res, 400, 'Invalid games id')
  }

  // SELECT * from game where id = ?
  const game = await prisma.game.findUnique({
    where: { id },
    include: { category: true },
  });

  if (!game) {
    return sendError(res, 404, "Gioco non trovato" );
  }

  res.json(game);}

export async function store(req, res) {
    const { name, description, price, categoryId } = req.body;

  // INSERT INTO game (...) VALUES (...)
  const newGame = await prisma.game.create({
    data: {
      name,
      description,
      price: Number(price),
      categoryId: Number(categoryId),
    },
    include: { category: true },
  });

  res.status(201).json(newGame);
 }

export async function update(req, res) {
  const id = Number(req.params.id);
  if (!Number.isInteger(id)) return sendError(res, 400, 'Invalid game id'); 

  const { name, description, price, categoryId } = req.body;

  if (categoryId !== undefined) {
  
    const category = await prisma.category.findUnique({
      where: {
        id: categoryId,
      }  
    });
    if (!categoryId) {
      sendError(res, 400, '_Invalid category id');
      return;
    }
  }

  // UPDATE game SET ... where id = ?
  const updateGame = await prisma.game.update({
    where: { id },
    data: {
      name,
      description,
      price: price !== undefined ? Number(price) : undefined,
      categoryId,
    },
    include: { category: true },
  });

  res.json(updateGame);
 }

export async function destroy(req, res) {
  const id = Number(req.params.id);

  // DELETE from game where id = ?
  await prisma.game.delete({ where: { id } });

  res.status(204).send();
}

