const dotenv = require("dotenv");

const mongoose = require("mongoose");
const app = require("./router");

dotenv.config();

const mongoDB = process.env.MONGODB_URL;

main().catch((err) => console.log(err));
async function main() {
  await mongoose.connect(mongoDB);
}

// Démarrer le serveur
app.listen(8000, () => {
  console.log("Server is running on port 8000!");
});
