const dotenv = require("dotenv");

const mongoose = require("mongoose");

import { app } from "./router";
dotenv.config();

const mongoDB = process.env.MONGODB_URL;

async function main() {
  await mongoose.connect(mongoDB);
}

// Démarrer le serveur
app.listen(8000, () => {
  console.log("Server is running on port 8000");
});
