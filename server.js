import express from "express";
import axios from "axios";
import cors from "cors";
import cheerio from "cheerio";
import dotenv from "dotenv";

// Charger les variables d'environnement
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(cors()); // Autorise les requêtes cross-origin (depuis votre HTML)
app.use(express.json()); // Permet de lire le JSON dans les corps de requête

app.post("/ask-ai", async (req, res) => {
  const { question } = req.body;
  const openRouterApiKey = process.env.OPENROUTER_API_KEY;

  if (!question) {
    return res.status(400).json({ error: "La question est manquante." });
  }

  if (!openRouterApiKey) {
    console.error("Clé API OpenRouter manquante. Vérifiez votre fichier .env");
    return res.status(500).json({ error: "Configuration du serveur incomplète." });
  }

  try {
    // 1. Scraper les dernières actualités de Elbotola
    const { data: html } = await axios.get("https://www.elbotola.com/");
    const $ = cheerio.load(html);
    let news = [];
    // Cible plus précise pour les titres d'actualités
    $("h3.media-title a").each((i, el) => {
      if (i < 5) { // On prend les 5 premiers titres
        news.push($(el).text().trim());
      }
    });

    // 2. Construire le prompt pour l'IA
    const prompt = `Basé sur les dernières actualités du football marocain qui sont : "${news.join('", "')}". Réponds à la question suivante de manière concise et informative comme un journaliste sportif : "${question}"`;

    // 3. Appeler l'API OpenRouter
    const response = await axios.post("https://openrouter.ai/api/v1/chat/completions", {
      model: "nvidia/nemotron-nano-9b-v2:free", // ou un autre modèle de votre choix
      messages: [{ role: "user", content: prompt }]
    }, {
      headers: {
        "Authorization": `Bearer ${openRouterApiKey}`,
        "Content-Type": "application/json"
      }
    });

    const answer = response.data?.choices?.[0]?.message?.content || "Désolé, je n'ai pas pu générer de réponse pour le moment.";
    res.json({ answer });

  } catch (error) {
    console.error("Erreur lors de l'appel à l'IA ou du scraping:", error.response ? error.response.data : error.message);
    res.status(500).json({ error: "Une erreur est survenue lors de la génération de la réponse." });
  }
});

app.listen(PORT, () => console.log(`Koora-AI API démarré sur http://localhost:${PORT}`));
