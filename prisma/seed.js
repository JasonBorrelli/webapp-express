const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    console.log(`Start seeding ...`);

    // 1. Pulizia: prima i giochi (hanno la FK), poi le categorie
    await prisma.game.deleteMany();
    await prisma.category.deleteMany();

    // 2. Dati delle categorie
    const categoriesData = [
        { name: 'RPG' },
        { name: 'Action' },
        { name: 'Adventure' },
        { name: 'Sport' },
        { name: 'Strategy' },
        { name: 'Racing' },
    ];

    // 3. Creo le categorie e le salvo in una mappa nome -> id
    const categories = {};
    for (const cat of categoriesData) {
        const created = await prisma.category.create({ data: cat });
        categories[created.name] = created.id;
        console.log(`Categoria creata: ${created.name}`);
    }

    // 4. Dati dei giochi (la categoria è indicata per nome)
    const gamesData = [
        { title: 'The Witcher 3: Wild Hunt', description: 'RPG open world fantasy', releaseYear: 2015, price: 29.99, rating: 9.7, category: 'RPG' },
        { title: 'Elden Ring', description: 'Action RPG open world di FromSoftware', releaseYear: 2022, price: 59.99, rating: 9.5, category: 'RPG' },
        { title: 'God of War', description: 'Kratos nel mondo della mitologia norrena', releaseYear: 2018, price: 39.99, rating: 9.4, category: 'Action' },
        { title: 'Red Dead Redemption 2', description: 'Western open world di Rockstar', releaseYear: 2018, price: 49.99, rating: 9.6, category: 'Adventure' },
        { title: 'The Legend of Zelda: Breath of the Wild', description: 'Esplorazione libera ad Hyrule', releaseYear: 2017, price: 59.99, rating: 9.7, category: 'Adventure' },
        { title: 'FIFA 23', description: 'Simulazione calcistica', releaseYear: 2022, price: 39.99, rating: 7.5, category: 'Sport' },
        { title: 'Civilization VI', description: 'Strategia a turni', releaseYear: 2016, price: 29.99, rating: 8.8, category: 'Strategy' },
        { title: 'Forza Horizon 5', description: 'Racing open world in Messico', releaseYear: 2021, price: 59.99, rating: 9.2, category: 'Racing' },
    ];

    // 5. Creo i giochi collegandoli alla categoria tramite id
    for (const { category, ...game } of gamesData) {
        await prisma.game.create({
            data: {
                ...game,
                categoryId: categories[category],
            },
        });
        console.log(`Gioco creato: ${game.title}`);
    }

    console.log(`Seeding finished.`);
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(() => prisma.$disconnect());
