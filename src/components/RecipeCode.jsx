import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";

export default function Recipie({ ingredients}) {
  const [recipe, setRecipe] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchRecipe() {
      setLoading(true);

      const response = await fetch("/api/recipe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ingredients }),
      });

      const data = await response.json();
      setRecipe(data.recipe);
      setLoading(false);
    }

    fetchRecipe();
  }, [ingredients]);

  if (loading) {
    return <p>Generating recipe...</p>;
  }

  return (
    <section>
      <h2>Chef Recommends:</h2>

      <article className="suggested-recipe-container" aria-live="polite">
        <ReactMarkdown>{recipe}</ReactMarkdown>
      </article>

    </section>
  );
}
