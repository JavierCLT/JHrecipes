import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import {Head, Link} from "@inertiajs/react";
import {Card, CardContent} from "@/Components/ui/card";

export default function TagsIndex({tags}: { tags: Tag[] }) {
    return (
        <AuthenticatedLayout>
            <Head title="Tags"/>

            <div className="container">
                {tags.length > 0 && <Card>
                    <CardContent className="pt-6 flex gap-2 flex-wrap">
                        {
                            tags.map((tag, index) => (
                                    <Link
                                        key={index}
                                        className="bg-[#d7bba5] text-black hover:text-[#e4c3ad] p-2 rounded inline-block transition hover:-translate-y-1 hover:bg-[#505f6f]"
                                        href={route('recipes.index', {tags: tag.name})}
                                    >
                                        {tag.name}
                                    </Link>
                                )
                            )
                        }
                    </CardContent>
                </Card>
                }
            </div>
        </AuthenticatedLayout>
    )
}
