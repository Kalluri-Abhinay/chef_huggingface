export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { ingredients } = req.body;

  const systemPrompt = `
You are a recipe generator...
`;

  const messages = [
    { role: "system", content: systemPrompt },
    { role: "user", content: `Ingredients: ${ingredients.join(", ")}` }
  ];

  try {
    const response = await fetch(
      "https://router.huggingface.co/hf-inference/models/deepseek-ai/DeepSeek-R1-0528",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.HF_ACCESS_TOKEN}`,
        },
        body: JSON.stringify({ messages }),
      }
    );

    const data = await response.json();
    return res.status(200).json({ recipe: data });
  } catch (err) {
    return res.status(500).json({ error: "Server error", details: err.message });
  }
}
