
/*
Exemplo de como criar a collection do mongo no docker*/ 

db = db.getSiblingDB("testdb");

db.heroes.insertMany([
    { name: "Superman", studio: "DC Comics" },
    { name: "Batman", studio: "DC Comics" }
]);