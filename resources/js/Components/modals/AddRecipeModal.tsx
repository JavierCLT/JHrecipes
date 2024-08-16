import {Button} from "@/Components/ui/button"
import {Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle,} from "@/Components/ui/dialog"
import {Input} from "@/Components/ui/input"
import {Label} from "@/Components/ui/label"
import {Textarea} from "@/Components/ui/textarea";
import {useForm} from "@inertiajs/react";
import {FormEventHandler, useEffect} from "react";
import InputError from "@/Components/ui/input-error";
import axios from "axios";
import {emitter} from "@/lib/emitter";

export default function AddRecipeModal({show, onClose}: { show: boolean, onClose: () => void }) {
    const {data, setData, post, processing, errors, reset} = useForm({
        title: "",
        ingredients: "",
        instructions: "",
        tags: "",
        servings: "",
        origin: "",
    })

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route('recipes.store'), {
            onSuccess: (params) => {
                onClose();
                reset();
            },
        });
    };

    return (
        <Dialog open={show} onOpenChange={onClose}>
            <DialogContent className="max-h-[90%] overflow-y-auto rounded-lg max-w-[85%] p-3 lg:p-6 xl:max-w-7xl overflow-x-hidden">
                <form onSubmit={submit}>
                    <DialogHeader>
                        <DialogTitle>Add New Recipe</DialogTitle>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
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
                        <Button type="reset" onClick={onClose} variant="secondary">Cancel</Button>
                        <Button type="submit">Save changes</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}
