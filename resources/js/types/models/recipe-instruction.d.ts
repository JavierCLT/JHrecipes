type RecipeInstruction = {
    id: number;
    recipe_id: number;
    step_number: number;
    description: string;
    created_at: string /* Date */ | null;
    updated_at: string /* Date */ | null;
};
