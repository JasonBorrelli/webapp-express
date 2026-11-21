// prisma/seed.js
import { prisma } from "../libs/prismaClient.js";

const categories = [
  { name: "RPG", description: "Giochi di ruolo con progressione del personaggio" },
  { name: "Azione-Avventura", description: "Esplorazione, combattimento e narrazione" },
  { name: "Sparatutto", description: "Giochi in prima o terza persona basati sulle armi" },
  { name: "Sport", description: "Simulazioni sportive e giochi di competizione" },
  { name: "Indie", description: "Produzioni indipendenti, spesso sperimentali" },
];

const games = [
  { name: "The Witcher 3: Wild Hunt", description: "RPG open world con Geralt di Rivia", price: 39.99, category: "RPG" },
  { name: "Elden Ring", description: "Action RPG open world di FromSoftware", price: 59.99, category: "RPG" },
  { name: "Baldur's Gate 3", description: "RPG a turni basato su D&D", price: 59.99, category: "RPG" },
  { name: "The Legend of Zelda: Breath of the Wild", description: "Avventura open world in Hyrule", price: 59.99, category: "Azione-Avventura" },
  { name: "God of War", description: "Kratos e Atreus nei regni nordici", price: 49.99, category: "Azione-Avventura" },
  { name: "Red Dead Redemption 2", description: "Western open world di Rockstar", price: 54.99, category: "Azione-Avventura" },
  { name: "DOOM Eternal", description: "FPS frenetico contro le orde dell'inferno", price: 39.99, category: "Sparatutto" },
  { name: "Counter-Strike 2", description: "FPS tattico competitivo a squadre", price: 0, category: "Sparatutto" },
  { name: "EA Sports FC 25", description: "Simulazione calcistica", price: 69.99, category: "Sport" },
  { name: "NBA 2K25", description: "Simulazione di basket", price: 69.99, category: "Sport" },
  { name: "Hollow Knight", description: "Metroidvania in un regno di insetti", price: 14.99, category: "Indie" },
  { name: "Hades", description: "Roguelike d'azione ambientato negli inferi greci", price: 24.99, category: "Indie" },
];

async function main() {
  await prisma.game.deleteMany();
  await prisma.category.deleteMany();

  for (const category of categories) {
    await prisma.category.create({ data: category });
  }

  for (const { category, ...game } of games) {
    await prisma.game.create({
      data: {
        ...game,
        category: { connect: { name: category } },
      },
    });
  }

  console.log(`Inseriti ${categories.length} categorie e ${games.length} giochi`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });