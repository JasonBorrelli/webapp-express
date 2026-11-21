async function main() {                                    //funzione asincrona che esegue il seeding dei dati nel database
    console.log(`Start seeding ...`)                                        
}
main().catch((e) => {                                       // gestione degli errori durante l'esecuzione della funzione main

    console.log(e);                                         // stampa l'errore sulla console
    process.exit(1);                                        // termina il processo con un codice di uscita 1 in caso di errore

}).finally(() => prisma.$disconnect());                     // disconnessione dal database al termine dell'esecuzione della funzione main
