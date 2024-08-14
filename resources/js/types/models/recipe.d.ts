type Recipe = {
    id: number;
    user_id: number;
    title: string;
    servings: string;
    origin: string;
    is_favorite?: boolean;
    created_at: string /* Date */ | null;
    updated_at: string /* Date */ | null;
    ingredients?: RecipeIngredient[] | null;
    instructions?: RecipeInstruction[] | null;
    tags?: Tag[] | null;
};
