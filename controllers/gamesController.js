import prisma from "../libs/prismaClient.js";

const sendError = (res, status, message) =>
  res.status(status).json({
    error: message, 
    status,
  })

  const isStringValid = value => typeof value === 'string' && value.trim() !== '';

export async function index() { 
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
    orderBy: { id: "asc" },
    take: limit ? Number(limit) : undefined,
  });

  res.json(games);}

export async function show() { 
 const
 }

export async function store() { }

export async function update() { }

export async function destroy() { }

