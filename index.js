const mongoose = require("mongoose");
require("dotenv").config(); // Charger les variables d'environnement depuis .env
const Person = require("./models/person");

const personId = "6665d2cf94ca92ab53ce7720";

// Connecter à la base de données MongoDB
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");

    // Étape 2: Création et sauvegarde d'un enregistrement de modèle
    const person = new Person({
      name: "John",
      age: 30,
      favoriteFoods: ["Pizza", "Sushi"],
    });

    person
      .save()
      .then((data) => {
        console.log("Record saved successfully:", data);

        // Étape 3: Création de plusieurs enregistrements avec model.create()
        const arrayOfPeople = [
          { name: "Alice", age: 25, favoriteFoods: ["Burger", "Pasta"] },
          { name: "Bob", age: 40, favoriteFoods: ["Tacos", "Steak"] },
          { name: "Mary", age: 35, favoriteFoods: ["Salad", "Soup"] },
          { name: "Charlie", age: 28, favoriteFoods: ["Burritos", "Pizza"] },
          { name: "Eve", age: 32, favoriteFoods: ["Burritos", "Sushi"] },
        ];

        return Person.create(arrayOfPeople);
      })
      .then((people) => {
        console.log("Multiple records created successfully:", people);

        // Étape 4: Utilisation de model.find() pour rechercher dans la base de données
        return Person.find({ name: "John" });
      })
      .then((people) => {
        console.log("People named John:", people);

        // Étape 5: Utilisation de model.findOne() pour retourner un seul document correspondant dans la base de données
        return Person.findOne({ favoriteFoods: "Pizza" });
      })
      .then((person) => {
        console.log("Person who likes Pizza:", person);

        // Étape 6: Utilisation de model.findById() pour rechercher dans la base de données par _id

        return Person.findById(personId);
      })
      .then((person) => {
        console.log("Person found by ID:", person);

        // Étape 7: Mises à jour classiques en exécutant Find, Edit, puis Save
        return Person.findById(personId);
      })
      .then((person) => {
        // Ajouter 'Hamburger' à la liste des plats préférés
        person.favoriteFoods.push("Hamburger");

        // Enregistrer la personne mise à jour
        return person.save();
      })
      .then((updatedPerson) => {
        console.log("Person updated successfully:", updatedPerson);

        // Étape 8: Réalisation de nouvelles mises à jour sur un document en utilisant model.findOneAndUpdate()
        const personName = "Alice"; // Remplacez par un nom réel
        return Person.findOneAndUpdate(
          { name: personName }, // Recherche par nom
          { age: 20 }, // Mise à jour de l'âge à 20
          { new: true } // Retourner le document mis à jour
        );
      })
      .then((updatedPerson) => {
        console.log("Updated person:", updatedPerson);

        // Étape 9: Suppression d'un document à l'aide de model.findByIdAndRemove
        Person.findByIdAndDelete(personId)
          .then((removedPerson) => {
            console.log("Removed person:", removedPerson);
          })
          .catch((err) => {
            console.error(err);
          });

        // Étape 10: Suppression de plusieurs documents à l'aide de model.remove()
        return Person.deleteMany({ name: "Mary" });
      })
      .then((result) => {
        console.log("Number of people removed:", result.deletedCount);

        // Étape 11: Chaînage des aides de requête de recherche pour affiner les résultats de recherche
        return Person.find({ favoriteFoods: "Burritos" }) // Rechercher les personnes qui aiment les burritos
          .sort("name") // Trier par nom
          .limit(2) // Limiter les résultats à deux documents
          .select("-age"); // Cacher l'âge
      })
      .then((data) => {
        console.log("Burritos lovers:", data);
      })
      .catch((err) => {
        console.error(err);
      });
  })
  .catch((err) => console.error("Error connecting to MongoDB:", err));
