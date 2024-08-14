type RecipeIngredient = {
    id: number;
    recipe_id: number;
    description: string;
    created_at: string /* Date */ | null;
    updated_at: string /* Date */ | null;
};
