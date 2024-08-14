import {FormEventHandler, useEffect} from 'react';
import GuestLayout from '@/Layouts/GuestLayout';
import {Head, Link, useForm} from '@inertiajs/react';
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/Components/ui/card";
import {Label} from "@/Components/ui/label";
import {Input} from "@/Components/ui/input";
import InputError from "@/Components/ui/input-error";
import {Button} from "@/Components/ui/button";
import GoogleIcon from "@/Components/icons/GoogleIcon";
import {useToast} from "@/Components/ui/use-toast";

export default function Login({errors: responseErrors, status, canResetPassword}: { status?: string, canResetPassword: boolean, errors?: {message: string} }) {
    const {toast} = useToast()

    const {data, setData, post, processing, errors, reset} = useForm({
        email: '',
        password: '',
        remember: true,
    });

    useEffect(() => {
        if (responseErrors?.message) {
            toast({
                title: "Uh oh! Something went wrong.",
                description: responseErrors.message,
                variant: "destructive"
            })
        }
    }, [])

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route('login'), {
            onFinish: () => reset('password'),
        });
    };

    return (
        <GuestLayout>
            <Head title="Log in"/>

            {status && <div className="mb-4 font-medium text-sm text-green-600">{status}</div>}

            <Card className="mx-auto w-full md:w-96">
                <CardHeader>
                    <CardTitle className="text-2xl">Login</CardTitle>
                    <CardDescription>
                        Enter your email below to login to your account
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={submit}>
                        <div className="grid gap-4">
                            <div className="grid gap-2">
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="javier@example.com"
                                    onChange={e => setData('email', e.target.value)}
                                    required
                                />
                                <InputError message={errors.email} />
                            </div>
                            <div className="grid gap-2">
                                {/*<div className="flex items-center">*/}
                                {/*    <Label htmlFor="password">Password</Label>*/}
                                {/*    <Link href="/forgot-password" className="ml-auto inline-block text-sm underline">*/}
                                {/*        Forgot your password?*/}
                                {/*    </Link>*/}
                                {/*</div>*/}
                                <Input
                                    id="password"
                                    type="password"
                                    onChange={e => setData('password', e.target.value)}
                                    required
                                />
                            </div>
                            <Button type="submit" className="w-full">
                                Login
                            </Button>
                            <Button variant="outline" className="w-full" asChild>
                                <Link href={route('auth.google.redirect')}>
                                    <GoogleIcon className="size-4 mr-2" /> Login with Google
                                </Link>
                            </Button>
                        </div>
                    </form>
                    <div className="mt-4 text-center text-sm">
                        Don't have an account?{" "}
                        <Link href="/register" className="underline">
                            Sign up
                        </Link>
                    </div>
                </CardContent>
            </Card>

        </GuestLayout>
    );
}
