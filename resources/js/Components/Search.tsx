import {Input} from "@/Components/ui/input";
import {useEffect, useState} from "react";
import {router} from "@inertiajs/react";

export default function Search() {
    const [searchParams, setSearchParams] = useState({
        searchQuery: route().queryParams.searchQuery,
        tags: route().queryParams.tags,
    })

    useEffect(() => {
        if(route().queryParams.searchQuery === searchParams.searchQuery) {
            return
        }

        const search = setTimeout(() => {
            router.get(route('recipes.index'), searchParams, {
                preserveState: true,
                replace: true
            })
        }, 300)

        return () => {
            clearTimeout(search)
        }
    }, [ searchParams ])

    return (
        <div className="text-center space-y-4 pb-6 container">
            <div className="flex justify-center w-full">
                <Input
                    className="rounded-full w-full md:max-w-lg"
                    placeholder="Search by recipe, ingredient, tag..."
                    defaultValue={searchParams.searchQuery}
                    onChange={e => setSearchParams(prevState => ({tags: '', searchQuery: e.target.value}))}
                />
            </div>
        </div>
    )
}
