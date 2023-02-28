from fastapi import APIRouter, Depends
from queries.recipes import RecipeQueries, RecipeDetails, IngredientWidget


router = APIRouter()


@router.get("/search-recipes")
def get_recipe(
    diet: str,
    intolerances: str,
    includeIngredients: str,
    maxReadyTime: str,
    number: str,
    repo: RecipeQueries = Depends(),
):

    return repo.get_recipe(
        diet, intolerances, includeIngredients, maxReadyTime, number
    )


@router.get('/recipe-details/{id}')
def get_recipe_details(
    id: int,
    repo:  RecipeDetails = Depends(),
    repo_ing: IngredientWidget = Depends()
):
    return repo.get_details(id), repo_ing.get_ingredient_widget(id)
