import "dotenv/config";
import app from "./src/app.js";

const PORT = process.env.PORT || 3000;

// Démarrage du serveur après la synchronisation
app.listen(PORT, () => {
  console.log(`Application démarrée sur http://localhost:${PORT}`);
});
