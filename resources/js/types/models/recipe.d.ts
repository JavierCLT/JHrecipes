type Recipe = {
    id: number;
    user_id: number;
    title: string;
    servings: string;
    origin: string;
    created_at: string /* Date */ | null;
    updated_at: string /* Date */ | null;
    is_perfected: any;
    ingredients?: RecipeIngredient[] | null;
    instructions?: RecipeInstruction[] | null;
    tags?: Tag[] | null;
};
