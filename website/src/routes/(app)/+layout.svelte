<script lang="ts">
    import {DashboardMainNav, ThemeToggle, UserNav} from "./";
    import {authState} from "$lib/firebase";
    import {gotoLogin} from "$lib/routing";
    import {Command} from "lucide-svelte";
    import Authguard from './authguard.svelte';
    import {hotkey} from "svelte-gh-hotkey";

    authState.subscribe(({isLoading, isLoggedIn}) => {
        if (!isLoggedIn && !isLoading) gotoLogin()
    });
</script>

<Authguard>
    <span slot="authenticated">
        <div class="flex-col md:flex h-full">
            <!--Navigation-->
            <div class="border-b h-[4rem]">
                <div class="flex h-16 items-center px-4">
                    <a href="/">
                        <Command class="h-5 mr-4"/>
                    </a>
                    <DashboardMainNav/>
                    <div class="ml-auto flex items-center space-x-4">
                        <ThemeToggle/>
                        <!--                <Search/>-->
                        {#if $authState.user}
                            <UserNav user={$authState.user}/>
                        {/if}
                    </div>
                </div>
            </div>
            <div class="max-h-screen" style="height: calc(100vh - 4rem);">
                <slot/>
            </div>
        </div>
    </span>
    <span slot="unauthenticated">
        Not allowed
    </span>
</Authguard>
