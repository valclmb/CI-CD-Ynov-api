const cors = require("cors");
const dotenv = require("dotenv");
const express = require("express");
const mysql = require("mysql2");
import { getAllUsers, postUsers } from "./src/api";

// Charger les variables d'environnement
dotenv.config();

// Créer une connexion à la base de données avec les variables d'environnement
export const pool = mysql.createPool({
  user: process.env.MYSQL_USER!,
  password: process.env.MYSQL_ROOT_PASSWORD!,
  database: process.env.MYSQL_DATABASE!,
  host: process.env.MYSQL_HOST!,
});

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
