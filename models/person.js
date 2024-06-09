const mongoose = require("mongoose");

// Définis le schéma pour le modèle "Person"
const personSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: { type: Number },
  favoriteFoods: { type: [String] },
});

// Crée et exporte le modèle "Person"
module.exports = mongoose.model("Person", personSchema);
