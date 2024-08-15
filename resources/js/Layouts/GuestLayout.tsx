import ApplicationLogo from '@/Components/ApplicationLogo';
import { Link } from '@inertiajs/react';
import { PropsWithChildren } from 'react';
import {Toaster} from "@/Components/ui/toaster";

export default function Guest({ children }: PropsWithChildren) {
    return (
        <div className="min-h-screen flex flex-col justify-center items-center p-4 bg-background dark:bg-gray-900">
            <div className="pb-6">
                <Link href="/">
                    <ApplicationLogo />
                </Link>
            </div>

            {children}
            <p className="hidden">T</p>
            <Toaster />
        </div>
    );
}
