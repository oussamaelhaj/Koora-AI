import express from "express";
import fetch from "node-fetch";
import cors from "cors";
import cheerio from "cheerio";

const app = express();
app.use(cors());
app.use(express.json());

app.post("/ask", async (req, res) => {
  const { question, apiKey } = req.body;

  const html = await (await fetch("https://www.elbotola.com/")).text();
  const $ = cheerio.load(html);
  let news = [];
  $(".news-item-title a").each((i, el) => {
    if (i < 5) news.push($(el).text());
  });

  const prompt = `Voici les dernières nouvelles de elbotola.com: ${news.join(", ")}. Réponds à la question suivante : ${question}`;

  const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${apiKey}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      model: "nvidia/nemotron-nano-9b-v2:free",
      messages: [{ role: "user", content: prompt }]
    })
  });

  const data = await response.json();
  const answer = data?.choices?.[0]?.message?.content || "Désolé, je n'ai pas de réponse.";

  res.json({ answer });
});

app.listen(process.env.PORT || 3000, () => console.log("Koora-AI API running"));
