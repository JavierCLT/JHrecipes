import {Head, router} from '@inertiajs/react';
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import RecipeCard from "@/Components/RecipeCard";
import {useRecipeDetailStore} from "@/lib/store/use-recipe-detail-store";
import {useEffect} from "react";
import {emitter} from "@/lib/emitter";

export default function RecipesIndex({recipes}: {recipes: Recipe[]}) {
    const {loadRecipe} = useRecipeDetailStore()

    const reload = () => {
        router.get(route('recipes.index'), route().queryParams, {
            preserveState: true,
            replace: true
        })
    }

    useEffect(() => {
        emitter.on('recipe.update', reload)

        return () => {
            emitter.off('recipe.update', reload)
        }
    }, [ recipes ])

    return (
        <AuthenticatedLayout>
            <Head title="Recipes" />

            <div className="container grid grid-cols-2 lg:grid-cols-4 gap-2.5 md:gap-5">
                {recipes.map((recipe, index) => (
                    <div key={index} onClick={() => loadRecipe(recipe.id)}>
                        <RecipeCard recipe={recipe} />
                    </div>
                ))}
            </div>
        </AuthenticatedLayout>
    );
}
