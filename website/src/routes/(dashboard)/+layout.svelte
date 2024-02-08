<script lang="ts">
    import {DashboardMainNav, ThemeToggle, UserNav} from "$lib/dashboard";
    import {authState} from "$lib/firebase";
    import {gotoLogin} from "$lib/routing";

    authState.subscribe(({isLoading, isLoggedIn}) => {
        if (!isLoggedIn && !isLoading) gotoLogin()
    });
</script>

{#if $authState.user}
    <div class="flex-col md:flex h-full">
        <!--Navigation-->
        <div class="border-b">
            <div class="flex h-16 items-center px-4">
                <!--            <TeamSwitcher/>-->
                <DashboardMainNav class="mx-6"/>
                <div class="ml-auto flex items-center space-x-4">
                    <ThemeToggle/>
                    <!--                <Search/>-->
                    {#if $authState.user}
                        <UserNav user={$authState.user}/>
                    {/if}
                </div>
            </div>
        </div>
        <div class="h-full">
            <slot/>
        </div>
    </div>
{:else}
    <div>
        Loading...
    </div>
{/if}