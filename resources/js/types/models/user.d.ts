type User = {
    id: number;
    google_id: string | null;
    name: string;
    email: string;
    email_verified_at: string /* Date */;
    created_at: string /* Date */ | null;
    updated_at: string /* Date */ | null;
    recipes?: Recipe[] | null;
    favorite_recipes?: Recipe[] | null;
};
