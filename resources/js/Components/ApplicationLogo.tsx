import {HTMLAttributes, SVGAttributes} from 'react';
import {cn} from "@/lib/utils";

export default function ApplicationLogo(props: HTMLAttributes<HTMLParagraphElement>) {
    return (
        <p {...props} className={cn("text-5xl font-bold font-serif", props.className!)}>JH Recipes</p>
);
}
