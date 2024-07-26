const { getAllUsers, postUsers } = require("./src/api");

const express = require("express");
const cors = require("cors");

// Créer une instance de l'application Express
const app = express();

// Options pour CORS
const corsOptions = {
  origin: "*",
  optionsSuccessStatus: 200,
};

// Middleware pour le traitement des requêtes JSON
app.use(express.json());

// Middleware pour CORS
app.use(cors(corsOptions));

// Configurer le routeur Express
const router = express.Router();
router.route("/").get(getAllUsers);
router.route("/").post(postUsers);

app.use("/users", router);

module.exports = app;
