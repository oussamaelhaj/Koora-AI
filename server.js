import express from "express";
import axios from "axios";
import cors from "cors";
import * as cheerio from "cheerio"; // Correction de l'import
import dotenv from "dotenv";

// Charger les variables d'environnement
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(cors()); // Autorise les requêtes cross-origin (depuis votre HTML)
app.use(express.json()); // Permet de lire le JSON dans les corps de requête

// NOUVEL ENDPOINT POUR LES ACTUALITÉS AUTOMATIQUES
app.get("/latest-news", async (req, res) => {
  const openRouterApiKey = process.env.OPENROUTER_API_KEY;

  if (!openRouterApiKey) {
    console.error("Clé API OpenRouter manquante.");
    return res.status(500).json({ error: "Configuration du serveur incomplète." });
  }

  try {
    // 1. Construire le prompt pour l'IA avec recherche web
    const prompt = `
      Cherche sur internet les 4 dernières actualités importantes et variées du football mondial.
      Pour chaque actualité, fournis les informations dans un format de tableau JSON strict. Le tableau doit contenir 4 objets. Chaque objet doit avoir exactement ces clés : "title", "excerpt", "image", "source".
      Exemple de format de réponse :
      [
        {
          "title": "Titre de l'actualité",
          "excerpt": "Un résumé court et percutant de 2 phrases.",
          "image": "URL complète d'une image pertinente et de haute qualité.",
          "source": "Le nom du site source (ex: L'Équipe, BBC Sport)"
        }
      ]
      Ne réponds rien d'autre que le tableau JSON lui-même, sans texte explicatif avant ou après.
    `;

    // 2. Appeler l'IA avec un modèle capable de chercher sur le web
    const response = await axios.post("https://openrouter.ai/api/v1/chat/completions", {
      model: "perplexity/pplx-7b-online:free", // Modèle avec recherche web
      messages: [{ role: "user", content: prompt }]
    }, {
      headers: { "Authorization": `Bearer ${openRouterApiKey}` },
      timeout: 30000 // Ajout d'un timeout de 30 secondes
    });

    // L'IA renvoie une chaîne de caractères qui ressemble à un JSON.
    let rawResponse = response.data?.choices?.[0]?.message?.content;

    // Nettoyage de la réponse pour extraire uniquement le JSON
    const jsonMatch = rawResponse.match(/\[[\s\S]*\]/);
    if (!jsonMatch) {
      throw new Error("La réponse de l'IA ne contient pas de JSON valide.");
    }
    const jsonString = jsonMatch[0];

    // On parse la chaîne JSON pour la transformer en véritable objet/tableau JSON.
    res.json(JSON.parse(jsonString)); 

  } catch (error) {
    console.error("Erreur lors de la génération des actualités:", error.response ? error.response.data : error.message);
    res.status(500).json({ error: "Impossible de générer les actualités pour le moment." });
  }
});

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
    // Construire le prompt pour l'IA avec recherche web
    const prompt = `En te basant sur les informations les plus récentes disponibles sur internet, réponds à la question suivante sur le football comme un journaliste sportif expert : "${question}"`;

    // Appeler l'API OpenRouter avec un modèle de recherche
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
