import {create} from "zustand";
import axios from "axios";

interface RecipeDetailState {
    recipe?: Recipe | null;
    loadRecipe: (recipeId: number) => void;
    closeDetailModal: () => void;
    editMode: boolean;
    setEditMode: (mode: boolean) => void;
}

export const useRecipeDetailStore = create<RecipeDetailState>()((set) => ({
    editMode: false,
    recipe: undefined,
    setEditMode: mode => set(() => ({editMode: mode})),
    closeDetailModal: () => set(() => ({recipe: null, editMode: false})),
    loadRecipe: async recipeId => {
        const {data} = await axios.get(route('recipes.show', {
            recipe: recipeId
        }));

        return set(() => ({recipe: data}))
    },
}))
