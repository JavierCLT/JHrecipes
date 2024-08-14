import {Head, Link, useForm} from '@inertiajs/react';
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/Components/ui/card"

import {HeartIcon, ShareIcon, SquarePen, TrashIcon} from "lucide-react";
import {
    AlertDialog, AlertDialogAction, AlertDialogCancel,
    AlertDialogContent, AlertDialogDescription, AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger
} from "@/Components/ui/alert-dialog";
import {useToast} from "@/Components/ui/use-toast";
import {cn} from "@/lib/utils";
import {Button} from "@/Components/ui/button";
import {useState} from "react";

export default function RecipesIndex({recipe}: { recipe: Recipe }) {
    const { submit } = useForm()

    const [isFavorite, setIsFavorite] = useState(recipe.is_favorite)

    const { post: createFavorite } = useForm({
        recipe_id: recipe.id
    })

    const { delete: deleteFavorite } = useForm()

    const { toast } = useToast()

    const deleteRecipe = () => {
        submit("delete", route('recipes.destroy', {
            recipe: recipe.id
        }), {
            onSuccess: (params) => {
                toast({
                    title: "Success",
                    description: "Recipe deleted.",
                    duration: 1000
                })
            },
            onError: ({message}) => {
                toast({
                    variant: "destructive",
                    title: "Uh oh! Something went wrong.",
                    description: message,
                })
            }
        })
    }

    const handleCreateFavorite = () => {
        setIsFavorite(true)
        createFavorite(route('favorite-recipes.store'))
    }

    const handleDeleteFavorite = () => {
        setIsFavorite(false)
        deleteFavorite(route('favorite-recipes.destroy', {
            favorite_recipe: recipe.id
        }))
    }

    const share = () => {
        const ingredients = recipe.ingredients?.map(i => i.description)
            .join('\n');
        const instructions = recipe.instructions?.map(i => i.description)
            .join('\n');
        const tags = recipe.tags?.map(i => i.name)
            .join('\n');

        const shareData = {
            title: `Check out this recipe: ${recipe.title}`,
            text: `Ingredients:\n${ingredients}\n\nInstructions:\n${instructions}\n\nTags: ${tags}\n\nServings: ${recipe.servings}`,
            url: window.location.href
        };

        navigator.share(shareData).then(() => {
            console.log('Recipe shared successfully');
        }).catch((error) => {
            console.error('Error sharing recipe:', error);
        });
    }

    return (
        <AuthenticatedLayout>
            <Head title="Recipes"/>

            <div className="container flex flex-col md:flex-col-reverse gap-2">
                <Card className="w-full">
                    <CardHeader>
                        <CardTitle>{recipe.title}</CardTitle>
                        <CardDescription>
                            Servings: {recipe.servings}
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="grid gap-3">
                            <div className="grid gap-3 shadow p-3 border rounded-xl">
                                <h4 className="font-semibold">Ingredients</h4>
                                {recipe.ingredients?.map((item, index) => <li key={index}>{item.description}</li>)}
                            </div>

                            <div className="grid gap-3 shadow p-3 border rounded-xl">
                                <h4 className="font-semibold">Instructions</h4>
                                {recipe.instructions?.map((item, index) => <li key={index}>{item.description}</li>)}
                            </div>

                            <div className="grid gap-3 shadow p-3 border rounded-xl">
                                <h4 className="font-semibold">Origin</h4>
                                <p>{recipe.origin}</p>
                            </div>

                            <div className="grid gap-3 shadow p-3 border rounded-xl">
                                <h4 className="font-semibold">Tags</h4>
                                <p>{recipe.tags?.map(item => item.name).join(', ')}</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <div className="flex justify-end gap-2">
                    <Button variant="outline" onClick={share}>
                        <ShareIcon className="mr-2 size-4" /> Share
                    </Button>

                    <Button variant="outline" asChild>
                        <Link href={route('recipes.edit', {
                            recipe: recipe.id
                        })}>
                            <SquarePen className="mr-2 size-4" /> Edit Recipe
                        </Link>
                    </Button>

                    <Button size="icon" variant="outline" onClick={isFavorite ? handleDeleteFavorite : handleCreateFavorite}>
                        <HeartIcon className={cn("size-5", {
                            "fill-red-600 stroke-0": isFavorite
                        })} />
                    </Button>

                    <AlertDialog>
                        <AlertDialogTrigger asChild>
                            <Button size="icon" variant="destructive">
                                <TrashIcon className="size-4" />
                            </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                            <AlertDialogHeader>
                                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                                <AlertDialogDescription>
                                    This action cannot be undone. This will permanently delete this recipe.
                                </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction onClick={deleteRecipe}>Continue</AlertDialogAction>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
