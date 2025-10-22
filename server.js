import express from "express";
import axios from "axios";
import cors from "cors";
import dotenv from "dotenv";
import fs from 'fs/promises';
import path from 'path';

// Charger les variables d'environnement
dotenv.config();

const app = express();
const PORT = process.env.PORT || 10000;

// Chemin pour le fichier de cache persistant
const CACHE_DIR = path.join(process.cwd(), '.cache');
const STORIES_CACHE_PATH = path.join(CACHE_DIR, 'stories.json');

// Middlewares
app.use(cors()); // Autorise les requêtes cross-origin (depuis votre HTML)
app.use(express.json());

let storiesCache = null; // Cache en mémoire pour les histoires

// NOUVEAU : Données de secours par défaut
const defaultStories = [
    { title: "La Main de Dieu", story: "Lors du quart de finale de la Coupe du Monde 1986, Diego Maradona a marqué un but de la main contre l'Angleterre, un geste qu'il a décrit comme étant marqué 'un peu avec la tête de Maradona et un peu avec la main de Dieu'." },
    { title: "Le Miracle d'Istanbul", story: "En finale de la Ligue des Champions 2005, Liverpool, mené 3-0 à la mi-temps par l'AC Milan, a réussi à égaliser en six minutes avant de remporter le match aux tirs au but." },
    { title: "Le premier but en Coupe du Monde", story: "Le Français Lucien Laurent a marqué le tout premier but de l'histoire de la Coupe du Monde de la FIFA, le 13 juillet 1930, contre le Mexique." }
];

// Fonction pour lire le cache depuis un fichier
async function readCache() {
  try {
    await fs.mkdir(CACHE_DIR, { recursive: true });
    const data = await fs.readFile(STORIES_CACHE_PATH, 'utf8');
    const cachedData = JSON.parse(data);
    
    // Vérifier si le cache a plus de 24 heures
    if (Date.now() - cachedData.timestamp < 1000 * 60 * 60 * 24) {
      storiesCache = cachedData.data;
      console.log(`Cache persistant chargé avec succès.`);
    } else {
      console.log(`Le cache persistant a expiré.`);
    }
  } catch (error) {
    // C'est normal si le fichier n'existe pas au premier démarrage
    console.log(`Aucun cache persistant trouvé ou erreur de lecture.`);
  }
}

// Fonction pour écrire le cache dans un fichier
async function writeCache(data) {
  try {
    await fs.mkdir(CACHE_DIR, { recursive: true });
    const cacheContent = JSON.stringify({ timestamp: Date.now(), data });
    await fs.writeFile(STORIES_CACHE_PATH, cacheContent, 'utf8');
    console.log(`Cache persistant mis à jour.`);
  } catch (error) {
    console.error("Erreur lors de l'écriture du cache:", error.message);
  }
}

// Endpoint pour les histoires du football
app.get("/football-stories", async (req, res) => {
  const openRouterApiKey = process.env.OPENROUTER_API_KEY;

  if (!openRouterApiKey) {
    console.error("Clé API OpenRouter manquante dans les variables d'environnement.");
    return res.status(500).json({ error: "Configuration du serveur incomplète." });
  }

  // Utiliser le cache en mémoire s'il existe
  if (storiesCache) {
    console.log("Service des histoires depuis le cache en mémoire.");
    return res.json(storiesCache);
  }

  try {
    const prompt = `Tu es un expert en contenu sportif et SEO pour un site web de football. Ta mission est de générer une liste de 10 contenus variés et captivants pour attirer et retenir les visiteurs.

Fournis ta réponse exclusivement sous la forme d'un tableau JSON. Chaque objet dans le tableau doit contenir les clés "title" et "story".

Voici les types de contenu à inclure :
1.  **Histoires Historiques :** Raconte des anecdotes méconnues ou des moments fondateurs de l'histoire du football.
2.  **Records Incroyables :** Présente des records du monde du football (plus de buts, plus longue invincibilité, etc.) avec des détails surprenants.
3.  **Leçons de Motivation :** Tire des leçons de vie et de motivation à partir de la carrière de joueurs légendaires ou de retours spectaculaires (comebacks).
4.  **Sujets Tendance (SEO) :** Crée des titres et des paragraphes courts sur des sujets d'actualité ou des débats populaires ("Qui est le GOAT ?", "Les futurs cracks du football", etc.) en utilisant des mots-clés pertinents.

Assure-toi que les titres ("title") sont accrocheurs et optimisés pour le référencement (SEO), et que les contenus ("story") sont concis (2-4 phrases) et engageants.
    `;

    const response = await axios.post("https://openrouter.ai/api/v1/chat/completions", {
      model: "mistralai/devstral-small-2505:free",
      messages: [{ role: "user", content: prompt }]
    }, {
      headers: {
        "Authorization": `Bearer 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`,
        "HTTP-Referer": "https://koorazonefoot.com", // URL de votre site pour les classements OpenRouter
        "X-Title": "Koorazone Foot" // Nom de votre site
      },
      timeout: 45000
    });

    let rawResponse = response.data?.choices?.[0]?.message?.content;
    const jsonMatch = rawResponse.match(/(\[[\s\S]*\])/);
    if (!jsonMatch) throw new Error("La réponse de l'IA ne contient pas de JSON valide.");
    
    const storiesData = JSON.parse(jsonMatch[0]);
    await writeCache(storiesData); // Écrire dans le fichier de cache
    storiesCache = storiesData; // Mettre à jour le cache en mémoire
    res.json(storiesData);

  } catch (error) {
    console.error("Erreur lors de la génération des histoires:", error.message);
    // AMÉLIORATION : Logique de secours
    try {
      const data = await fs.readFile(STORIES_CACHE_PATH, 'utf8');
      const cachedData = JSON.parse(data);
      console.log("Erreur API détectée. Service des dernières données valides depuis le cache persistant.");
      res.json(cachedData.data);
    } catch (cacheError) {
      // ULTIME SECOURS : Le cache n'existe pas, servir les données par défaut
      console.log("Cache de secours non trouvé. Service des histoires par défaut.");
      res.status(500).json(defaultStories);
    }
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
    const prompt = `En te basant sur les informations les plus récentes disponibles sur internet, réponds à la question suivante sur le football comme un journaliste sportif expert : "${question}"`;

    const response = await axios.post("https://openrouter.ai/api/v1/chat/completions", {
      model: "deepseek/deepseek-chat",
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
    console.error("Erreur lors de l'appel à l'IA:", error.response ? error.response.data : error.message);
    res.status(500).json({ error: "Une erreur est survenue lors de la génération de la réponse." });
  }
});

app.listen(PORT, async () => {
  await readCache();
  console.log(`Koora-AI API démarré sur http://localhost:${PORT}`);
});
