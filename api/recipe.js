import { InferenceClient } from "@huggingface/inference";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { ingredients } = req.body;

  const client = new InferenceClient(process.env.HF_TOKEN);

  try {
    const completion = await client.chatCompletion({
      model: "deepseek-ai/DeepSeek-R1-0528:together",
      messages: [
        {
          role: "user",
          content: `Create a recipe using: ${ingredients.join(", ")}`,
        },
      ],
    });

    return res.status(200).json({
      recipe: completion.choices[0].message.content,
    });

  } catch (err) {
    return res.status(500).json({
      error: "HF SDK error",
      details: err.message,
    });
  }
}
