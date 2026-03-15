export default function IngredientsList(props) {

    const ingredientsListItems = props.ingredients.map((ingredient, index) => (
        <li key={index}>{ingredient}</li>
    ));

    return (
        <section>
            <h2>Ingredients on hand:</h2>

            <ul className="ingredients-list" aria-live="polite">
                {ingredientsListItems}
            </ul>

            {props.ingredients.length > 2 ? (
                <div className="get-recipe-container">
                    <div>
                        <h3>Ready for a recipe?</h3>
                        <p>Generate a recipe from your list of ingredients.</p>
                    </div>

                    {/* Buttons side-by-side */}
                    <div style={{ display: "flex", gap: "10px" }}>
                        <button onClick={props.handleRecipie}>Get Recipe</button>
                        <button onClick={props.handleReset}>Start Over</button>
                    </div>
                </div>
            ) : (
                <p className="add-more-ingredients">
                    Add at least 3 ingredients to get recipe suggestions!
                </p>
            )}
        </section>
    );
}
