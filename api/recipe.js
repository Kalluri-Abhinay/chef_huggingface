export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { ingredients } = req.body;

  const prompt = `
System: You are a recipe generator. Create a detailed recipe using the given ingredients.
User: Ingredients: ${ingredients.join(", ")}
Assistant:
`;

  try {
    const response = await fetch(
      "https://router.huggingface.co/hf-inference/models/deepseek-ai/DeepSeek-R1-0528",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.HF_ACCESS_TOKEN}`,
        },
        body: JSON.stringify({ inputs: prompt }),
      }
    );

    const text = await response.text();

    // Try to parse JSON
    try {
      const data = JSON.parse(text);
      return res.status(200).json({ recipe: data });
    } catch (err) {
      // Return the raw HF error so we can see what's wrong
      return res.status(500).json({
        error: "Invalid JSON from HuggingFace",
        details: text
      });
    }

  } catch (err) {
    return res.status(500).json({
      error: "Request failed",
      details: err.message
    });
  }
}
