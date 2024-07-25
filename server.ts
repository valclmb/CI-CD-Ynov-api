import { getAllUsers, postUsers } from "./src/api";
const cors = require("cors");
const dotenv = require("dotenv");
const express = require("express");
const mongoose = require("mongoose");
const User = require("./model/user");
dotenv.config();

const mongoDB = process.env.MONGODB_URL;

main().catch((err) => console.log(err));
async function main() {
  await mongoose.connect(mongoDB);
}

// Configurer le routeur Express
const router = express.Router();
router.route("/").get(getAllUsers);
router.route("/").post(postUsers);

// Créer une instance de l'application Express
const app = express();

// Options pour CORS
const corsOptions = {
  origin: "http://localhost:5173",
  optionsSuccessStatus: 200,
};

// Middleware pour le traitement des requêtes JSON
app.use(express.json());

// Middleware pour CORS
app.use(cors(corsOptions));

// Utiliser le routeur pour les routes /users
app.use("/users", router);

// Démarrer le serveur
app.listen(8000, () => {
  console.log("Server is running on port 8000");
});

// Exporter l'application Express pour les tests ou autres utilisations
export default app;
