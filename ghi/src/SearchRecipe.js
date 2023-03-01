import { useState } from 'react';
import { useAddFavoriteRecipeMutation, useLazyGetRecipeQuery } from "./auth/api";
import RecipeCard from './RecipeCard';

function RecipeSearch() {
    const [form, setForm] = useState({
        diet: '',
        intolerances: '',
        includeIngredients: '',
        maxReadyTime: '',
        number: '',
    })
    const [LazyRecipe, { data: lazyData }] = useLazyGetRecipeQuery();


    const handleSubmit = async (e) => {
        e.preventDefault()
        await LazyRecipe({ ...form })
    }
    const handleInputChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }


    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="diet">Diet:</label>
                    <input
                        type="text"
                        id="diet"
                        value={form.diet}
                        name='diet'
                        onChange={handleInputChange}
                    />
                </div>
                <div>
                    <label htmlFor="intolerances">Intolerances:</label>
                    <input
                        type="text"
                        id="intolerances"
                        name='intolerances'
                        value={form.intolerances}
                        onChange={handleInputChange}
                    />
                </div>
                <div>
                    <label htmlFor="includeIngredients">Include Ingredients:</label>
                    <input
                        type="text"
                        name='includeIngredients'
                        id="includeIngredients"
                        value={form.includeIngredients}
                        onChange={handleInputChange}
                    />
                </div>
                <div>
                    <label htmlFor="maxReadyTime">Max Ready Time:</label>
                    <input
                        type="text"
                        id="maxReadyTime"
                        name='maxReadyTime'
                        required
                        value={form.maxReadyTime}
                        onChange={handleInputChange}
                    />
                </div>
                <div>
                    <label htmlFor="number">Number of Results:</label>
                    <input
                        type="text"
                        id="number"
                        name='number'
                        value={form.number}
                        onChange={handleInputChange}
                    />
                </div>
                <button className='btn btn-outline-success' type='submit'>Search</button>
            </form>
                <div>
                <ul>
                    {lazyData?.results?.map((recipe) => (
                        <RecipeCard id={recipe.id} title={recipe.title} image={recipe.image} key={recipe.id}/>
                    ))}
                </ul>
                </div>
        </div>
    );
};
export default RecipeSearch;
