import {Head} from '@inertiajs/react';
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import RecipeCard from "@/Components/RecipeCard";
import {useRecipeDetailStore} from "@/lib/store/use-recipe-detail-store";

export default function RecipesIndex({recipes}: { recipes: Recipe[] }) {

    const {loadRecipe} = useRecipeDetailStore()

    return (
        <AuthenticatedLayout>
            <Head title="Recipes"/>

            <div className="container grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {
                    recipes.map((recipe, index) => (
                            <div key={index} onClick={() => loadRecipe(recipe.id)}>
                                <RecipeCard recipe={recipe}/>
                            </div>
                        )
                    )
                }
            </div>
        </AuthenticatedLayout>
    );
}
