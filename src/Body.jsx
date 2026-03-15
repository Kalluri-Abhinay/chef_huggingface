import { useState } from 'react'
import Recipie from './components/RecipeCode'
import IngredientsList from './components/IngredientsList'
export default function Body() {
    const [ingredients, setIngredients] = useState([])
    const [showRecipe, setShowRecipe] = useState(false)  

    function handleAddIngredient(formData) {
        const newIngredient = formData.get("ingredient").trim()
        if (newIngredient) {
            setIngredients(prevIngredients => [...prevIngredients, newIngredient])
        }        
    }

    function handleRecipie() {
        setShowRecipe(true)
    }
    function handleReset() {
    setIngredients([]);
    setShowRecipe(false);
}

    
    return (
        <main>

            <form className="add-ingredient-form" action={handleAddIngredient}>
                <input type="text" 
                placeholder="e.g. carrots, onions, garlic" 
                aria-label="Add ingredient"
                name="ingredient"
                />
                <button>Add ingredient </button>
            </form>
            { ingredients.length >0 && 

            <IngredientsList ingredients={ingredients} handleRecipie={handleRecipie} handleReset={handleReset} />
}
            {showRecipe ? <Recipie ingredients={ingredients} /> : null}
            
        </main>
    )
}