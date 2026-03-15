import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { HfInference } from "@huggingface/inference";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const hf = new HfInference(process.env.HF_TOKEN);

const SYSTEM_PROMPT = `
You are an assistant that receives a list of ingredients that a user has and suggests a recipe they could make with some or all of those ingredients. You don't need to use every ingredient they mention in your recipe. The recipe can include additional ingredients they didn't mention, but try not to include too many extra ingredients. Format your response in markdown to make it easier to render to a web page.
`;

app.post("/api/recipe", async (req, res) => {
  const { ingredients } = req.body;

  try {
    const ingredientsString = ingredients.join(", ");

    const response = await hf.chatCompletion({
      model: "deepseek-ai/DeepSeek-R1-0528",
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        {
          role: "user",
          content: `I have ${ingredientsString}. Please give me a recipe you'd recommend I make!`,
        },
      ],
      max_tokens: 1024,
    });

    let recipe = response.choices[0].message.content;

    // Remove DeepSeek <think> blocks
    recipe = recipe.replace(/<think>[\s\S]*?<\/think>/g, "").trim();

    res.json({ recipe });
  } catch (err) {
    console.error("HF ERROR:", err);
    res.status(500).json({ error: err.toString() });
  }
});

app.listen(5000, () => {
  console.log("Backend running on port 5000");
});
