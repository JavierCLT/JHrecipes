import {Head, useForm} from '@inertiajs/react';
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import {
    Card,
    CardContent,
} from "@/Components/ui/card"

import {Button} from "@/Components/ui/button";
import {HeartIcon, SquarePen, TrashIcon} from "lucide-react";
import {Label} from "@/Components/ui/label";
import {Input} from "@/Components/ui/input";
import InputError from "@/Components/ui/input-error";
import {Textarea} from "@/Components/ui/textarea";
import {FormEventHandler} from "react";
import {useToast} from "@/Components/ui/use-toast";

export default function RecipesIndex({recipe}: { recipe: Recipe }) {
    const { toast } = useToast()

    const {data, setData, put, processing, errors, reset} = useForm({
        title: recipe.title,
        ingredients: recipe.ingredients?.map(item => item.description).join('\n'),
        instructions: recipe.instructions?.map(item => item.description).join('\n'),
        tags: recipe.tags?.map(item => item.name).join(', '),
        servings: recipe.servings,
        origin: recipe.origin,
    })

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        put(route('recipes.update', {
            recipe: recipe.id
        }), {
            onSuccess: (params) => {
                toast({
                    title: "Success",
                    description: "Recipe updated.",
                })
            },
            onError: ({message}) => {
                toast({
                    variant: "destructive",
                    title: "Uh oh! Something went wrong.",
                    description: message,
                })
            }
        });
    };

    return (
        <AuthenticatedLayout>
            <Head title={`Edit ${recipe.title}`}/>

            <div className="container">
                <form onSubmit={submit}>
                    <Card className="w-full">
                        <CardContent className="pt-6">
                            <div className="grid gap-4">
                                <div className="grid gap-2">
                                    <Label htmlFor="title">
                                        Title
                                    </Label>
                                    <Input
                                        id="title"
                                        value={data.title}
                                        onChange={e => setData("title", e.target.value)}
                                        required
                                    />
                                    <InputError message={errors.title} />
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
                                    <InputError message={errors.ingredients} />
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
                                    <InputError message={errors.instructions} />
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
                                    <InputError message={errors.tags} />
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
                                    <InputError message={errors.servings} />
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
                                    <InputError message={errors.origin} />
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <div className="flex justify-end gap-2 pt-4">
                        <Button>
                            Save Changes
                        </Button>
                    </div>
                </form>
            </div>
        </AuthenticatedLayout>
    );
}
