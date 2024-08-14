import {Link} from "@inertiajs/react";
import {Card, CardContent} from "@/Components/ui/card";

export default function RecipeCard({recipe}: {recipe: Recipe}) {
    return (
        <Card className="cursor-pointer hover:bg-[#505f6f] hover:text-[#f2dddb] h-full transition hover:-translate-y-1">
            <CardContent className="p-2.5 md:p-4">
                <p className="font-semibold text-md md:text-xl">{recipe.title}</p>
            </CardContent>
        </Card>
    )
}
