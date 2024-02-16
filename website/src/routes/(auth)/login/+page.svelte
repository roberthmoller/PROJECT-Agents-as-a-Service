<script lang="ts">
    import {Icons} from "$lib/icons";
    import {Button} from "$lib/components/ui/button";
    import {Input} from "$lib/components/ui/input";
    import {Label} from "$lib/components/ui/label";
    import {signInWithGithub, signInWithEmailAndPassword, authState, signInWithGoogle} from '$lib/firebase';
    import {goto} from "$app/navigation";
    import * as Tooltip from "$lib/components/ui/tooltip";
    import {gotoChat} from "$lib/routing";

    let isLoading = false;
    let email = '';
    let password = '';
    $: isEmailValid = email.length > 0;
    $: isPasswordValid = password.length > 0;
    $: isFormValid = isEmailValid && isPasswordValid;

    authState.subscribe(({isLoggedIn, isLoading}) => {
        if (isLoggedIn && !isLoading) gotoChat();
    });
</script>


<div class="lg:p-8 h-full flex ">
    <div class="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
        <div class="flex flex-col space-y-2 text-center">
            <h1 class="text-2xl font-semibold tracking-tight">Log in to your account</h1>
            <p class="text-sm text-muted-foreground">
                Enter your email and password below to log in to your account
            </p>
        </div>

        <!--Login form-->
        <div>
            <form on:submit|preventDefault={() => {}}>
                <div class="grid gap-2">
                    <div class="grid gap-1">
                        <Label class="sr-only" for="email">Email</Label>
                        <Input
                                id="email"
                                placeholder="name@example.com*"
                                type="email"
                                autocapitalize="none"
                                autocomplete="email"
                                autocorrect="off"
                                disabled={isLoading}
                                bind:value={email}
                        />
                    </div>
                    <div class="grid gap-1">
                        <Label class="sr-only" for="email">Password</Label>
                        <Input
                                id="password"
                                placeholder="password*"
                                type="password"
                                autocapitalize="none"
                                autocomplete="password"
                                autocorrect="off"
                                disabled={isLoading}
                                bind:value={password}
                        />
                    </div>
                    <Button disabled={isLoading || !isFormValid}
                            on:click={() => signInWithEmailAndPassword(email, password)}>
                        {#if isLoading}
                            <Icons.spinner class="mr-2 h-4 w-4 animate-spin"/>
                        {/if}
                        Log in
                    </Button>
                </div>
            </form>

            <div class="relative my-3">
                <div class="absolute inset-0 flex items-center">
                    <span class="w-full border-t"/>
                </div>
                <div class="relative flex justify-center text-xs uppercase">
                    <span class="bg-background px-2 text-muted-foreground"> Or continue with </span>
                </div>
            </div>

            <div class="flex flex-col gap-2">
                <Button variant="outline" type="button" disabled={isLoading || true} on:click={signInWithGithub}>
                    {#if isLoading}
                        <Icons.spinner class="mr-2 h-4 w-4 animate-spin"/>
                    {:else}
                        <Icons.gitHub class="mr-2 h-4 w-4"/>
                    {/if}
                    GitHub
                </Button>

                <Button variant="outline" type="button" disabled={isLoading} on:click={signInWithGoogle}>
                    {#if isLoading}
                        <Icons.spinner class="mr-2 h-4 w-4 animate-spin"/>
                    {:else}
                        <Icons.google class="mr-2 h-4 w-4"/>
                    {/if}
                    Google
                </Button>
            </div>

        </div>


        <!--        <p class="px-8 text-center text-sm text-muted-foreground">-->
        <!--            By clicking continue, you agree to our{" "}-->
        <!--            <a href="/terms" class="underline underline-offset-4 hover:text-primary">-->
        <!--                Terms of Service-->
        <!--            </a>{" "}-->
        <!--            and{" "}-->
        <!--            <a href="/privacy" class="underline underline-offset-4 hover:text-primary">-->
        <!--                Privacy Policy-->
        <!--            </a>-->
        <!--            .-->
        <!--        </p>-->
    </div>
</div>
