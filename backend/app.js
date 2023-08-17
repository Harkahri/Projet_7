const express = require("express");
const cors = require("cors");

const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const bookRoutes = require("./routes/book");
const userRoutes = require("./routes/user");
const path = require("path");

require("dotenv").config();
// connexion à la base de données

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connexion à MongoDB réussie !"))
  .catch(() => console.log("Connexion à MongoDB échouée !"));

const app = express();

// CORS
// Autoriser toutes les requêtes CORS
// CORS DE DEVELOPPEMENT
app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);
// CORS FINALE
// const allowedOrigins = ["http://localhost:3000"];

// app.use(
//   cors({
//     origin: function (origin, callback) {
//       if (!origin || allowedOrigins.includes(origin)) {
//         callback(null, true);
//       } else {
//         callback(new Error("Not allowed by CORS"));
//       }
//     },
//     credentials: true,
//   })
// );

app.use(bodyParser.json());

app.use("/api/books", bookRoutes);
app.use("/api", userRoutes);

app.use("/images", express.static(path.join(__dirname, "images")));

const port = process.env.PORT || 4001;
app.listen(port, () => console.log(`Server started on port ${port}`));

module.exports = app;
