import {MouseEventHandler, PropsWithChildren, useState} from 'react';
import ApplicationLogo from '@/Components/ApplicationLogo';
import {Link, useForm} from '@inertiajs/react';
import {Button} from "@/Components/ui/button";
import {LogOutIcon, PlusIcon} from "lucide-react";
import {Toaster} from "@/Components/ui/toaster";
import Search from "@/Components/Search";
import AddRecipeModal from "@/Components/modals/AddRecipeModal";
import RecipeDetailModal from "@/Components/modals/RecipeDetailModal";

export default function Authenticated({ children }: PropsWithChildren) {
    const [showAddRecipeModal, setShowAddRecipeModal] = useState(false)

    const {post} = useForm()

    const logout: MouseEventHandler<HTMLButtonElement> = (e) => {
        e.preventDefault()

        post(route('logout'))
    }

    return (
        <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
            <div className="fixed top-0 w-full bg-gray-100 dark:bg-gray-900 z-10">
                <nav className="grid grid-cols-3 md:grid-cols-5 justify-center items-center container py-4">
                    <div className="col-start-2 md:col-start-3">
                        <Link href="/">
                            <ApplicationLogo className="text-xl md:text-2xl lg:text-5xl text-center" />
                        </Link>
                    </div>
                    <div className="md:col-span-2 justify-self-end flex justify-between gap-2">
                        <Button className="hidden md:block" onClick={() => setShowAddRecipeModal(true)}>Add New Recipe</Button>
                        <Button className="flex md:hidden" size="icon" onClick={() => setShowAddRecipeModal(true)}>
                            <PlusIcon className="h-4 w-4" />
                        </Button>
                        <AddRecipeModal show={showAddRecipeModal} onClose={() => setShowAddRecipeModal(false)} />

                        <Button className="hidden md:flex" variant="outline" onClick={logout}>
                            <LogOutIcon className="h-4 w-4 mr-2" /> Logout
                        </Button>
                        <Button className="flex md:hidden" variant="outline" size="icon" onClick={logout}>
                            <LogOutIcon className="h-4 w-4" />
                        </Button>
                    </div>
                </nav>

                <div className="text-center space-y-4 pt-4 container">
                    <div className="flex gap-6 justify-center">
                        <Link className={"font-semibold hover:underline "} href={route('home')}>All Recipes</Link>
                        <Link className={"font-semibold hover:underline "} href={route('tags.index')}>Tags</Link>
                        <Link className={"font-semibold hover:underline "} href={route('favorite-recipes.index')}>Favorites</Link>
                    </div>
                </div>

                <div className="pt-6">
                    <Search />
                </div>
            </div>

            <main className="pt-[200px] md:pt-[210px] lg:pt-[260px] xl:pt-[220px] pb-3">{children}</main>

            <RecipeDetailModal />
            <Toaster />
        </div>
    );
}
