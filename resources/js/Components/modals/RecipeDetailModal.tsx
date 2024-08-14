import {Button} from "@/Components/ui/button"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/Components/ui/dialog"
import {Input} from "@/Components/ui/input"
import {Label} from "@/Components/ui/label"
import {Textarea} from "@/Components/ui/textarea";
import {useForm} from "@inertiajs/react";
import React, {FormEventHandler, useState} from "react";
import InputError from "@/Components/ui/input-error";
import {HeartIcon, ShareIcon, SquarePen, TrashIcon} from "lucide-react";
import {cn} from "@/lib/utils";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger
} from "@/Components/ui/alert-dialog";
import {useToast} from "@/Components/ui/use-toast";
import axios from "axios";
import {useRecipeDetailStore} from "@/lib/store/use-recipe-detail-store";
import {emitter} from "@/lib/emitter";

function UpdateForm() {
    const {setEditMode, closeDetailModal, recipe, loadRecipe} = useRecipeDetailStore();

    if (!recipe) return;

    const {toast} = useToast()

    const ingredients = recipe.ingredients?.map(i => i.description)
        .join('\n');
    const instructions = recipe.instructions?.map(i => i.description)
        .join('\n');
    const tags = recipe.tags?.map(i => i.name)
        .join(', ');

    const {data, setData, submit: update, processing, errors, reset} = useForm({
        title: recipe.title,
        ingredients: ingredients,
        instructions: instructions,
        tags: tags,
        servings: recipe.servings,
        origin: recipe.origin,
    })

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        axios.put(route('recipes.update', {recipe: recipe.id}), data)
            .then(({data}) => {
                loadRecipe(recipe.id);

                emitter.emit("recipe.update", data)

                toast({
                    title: "Success",
                    description: "Recipe updated.",
                    duration: 1000
                })
                setEditMode(false)
            })
            .catch((reason) => {
                toast({
                    variant: "destructive",
                    title: "Uh oh! Something went wrong.",
                    description: reason.response.data.message,
                    duration: 1000
                })
            })
    };

    return (
        <form onSubmit={submit}>
            <DialogHeader>
                <DialogTitle>Edit Recipe</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                    <Label htmlFor="title">
                        Title:
                    </Label>
                    <Input
                        id="title"
                        value={data.title}
                        onChange={e => setData("title", e.target.value)}
                        required
                    />
                    <InputError message={errors.title}/>
                </div>
                <div className="grid gap-2">
                    <Label htmlFor="ingredients">
                        Ingredients (one per line, e.g., 1 tsp of salt):
                    </Label>
                    <Textarea
                        id="ingredients"
                        value={data.ingredients}
                        onChange={e => setData("ingredients", e.target.value)}
                        required
                    />
                    <InputError message={errors.ingredients}/>
                </div>
                <div className="grid gap-2">
                    <Label htmlFor="instructions">
                        Instructions (one per line):
                    </Label>
                    <Textarea
                        id="instructions"
                        value={data.instructions}
                        onChange={e => setData("instructions", e.target.value)}
                        required
                    />
                    <InputError message={errors.instructions}/>
                </div>
                <div className="grid gap-2">
                    <Label htmlFor="tags">
                        Tags (comma separated, e.g., breakfast, quick):
                    </Label>
                    <Input
                        id="tags"
                        value={data.tags}
                        onChange={e => setData("tags", e.target.value)}
                        required
                    />
                    <InputError message={errors.tags}/>
                </div>
                <div className="grid gap-2">
                    <Label htmlFor="servings">
                        Servings:
                    </Label>
                    <Input
                        id="servings"
                        value={data.servings}
                        onChange={e => setData("servings", e.target.value)}
                        required
                    />
                    <InputError message={errors.servings}/>
                </div>
                <div className="grid gap-2">
                    <Label htmlFor="origin">
                        Origin:
                    </Label>
                    <Input
                        id="origin"
                        value={data.origin}
                        onChange={e => setData("origin", e.target.value)}
                        required
                    />
                    <InputError message={errors.origin}/>
                </div>
            </div>
            <DialogFooter className="flex gap-2 md:gap-0">
                <Button type="reset" onClick={() => setEditMode(false)} variant="secondary">Cancel</Button>
                <Button type="submit">Save changes</Button>
            </DialogFooter>
        </form>
    )
}

function DetailCard() {
    const {closeDetailModal, setEditMode, recipe} = useRecipeDetailStore();

    if (!recipe) return;

    const {submit} = useForm()

    const [isFavorite, setIsFavorite] = useState(recipe.is_favorite)

    const {post: createFavorite} = useForm({
        recipe_id: recipe.id
    })

    const {delete: deleteFavorite} = useForm()

    const {toast} = useToast()

    const deleteRecipe = () => {
        submit("delete", route('recipes.destroy', {
            recipe: recipe.id
        }), {
            onSuccess: (params) => {
                closeDetailModal()

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
        <>
            <DialogHeader>
                <DialogTitle>{recipe.title}</DialogTitle>
                <DialogDescription>Servings: {recipe.servings}</DialogDescription>
            </DialogHeader>

            <div>
                <div className="grid gap-3">
                    <div className="grid gap-1 shadow p-3 border rounded-xl">
                        <h4 className="font-semibold">Ingredients</h4>
                        <ul className="space-y-1">
                            {recipe.ingredients?.map((item, index) => <li key={index}>{item.description}</li>)}
                        </ul>
                    </div>

                    <div className="grid gap-1 shadow p-3 border rounded-xl">
                        <h4 className="font-semibold">Instructions</h4>
                        <ol className="space-y-1">
                            {recipe.instructions?.map((item, index) => <li key={index}>{item.description}</li>)}
                        </ol>
                    </div>

                    <div className="shadow p-3 border rounded-xl">
                        <h4 className="font-semibold">Origin</h4>
                        <p>{recipe.origin}</p>
                    </div>

                    <div className="shadow p-3 border rounded-xl">
                        <h4 className="font-semibold">Tags</h4>
                        <p>{recipe.tags?.map(item => item.name).join(', ')}</p>
                    </div>
                </div>
            </div>

            <div className="flex justify-between md:justify-end gap-2">
                <Button variant="outline" className="outline-none" onClick={share} autoFocus={false}>
                    <ShareIcon className="md:mr-2 size-4"/> <span className="hidden md:inline-block">Share</span>
                </Button>

                <Button variant="outline" onClick={() => setEditMode(true)}>
                    <SquarePen className="mr-2 size-4"/> Edit Recipe
                </Button>

                <Button size="icon" variant="outline"
                        onClick={isFavorite ? handleDeleteFavorite : handleCreateFavorite}>
                    <HeartIcon className={cn("size-5", {
                        "fill-red-600 stroke-0": isFavorite
                    })}/>
                </Button>

                <AlertDialog>
                    <AlertDialogTrigger asChild>
                        <Button size="icon" variant="destructive">
                            <TrashIcon className="size-4"/>
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
        </>
    )
}

export default function RecipeDetailModal() {
    const {editMode, recipe, closeDetailModal} = useRecipeDetailStore();

    return recipe && (
        <Dialog open={true} onOpenChange={() => closeDetailModal()}>
            <DialogContent
                onOpenAutoFocus={(e) => e.preventDefault()}
                className="max-h-[90%] overflow-y-auto rounded-lg max-w-[85%] p-3 lg:p-6 xl:max-w-7xl overflow-x-hidden"
            >
                {!editMode && <DetailCard/>}
                {editMode && <UpdateForm/>}
            </DialogContent>
            <DialogClose asChild>a</DialogClose>
        </Dialog>
    )
}
