<script lang="ts">
    import "../app.pcss";
    import {ModeWatcher} from "mode-watcher";
    import {DashboardMainNav, ThemeToggle, UserNav} from ".";
</script>

<ModeWatcher/>

<div class="hidden flex-col md:flex">
    <!--Navigation-->
    <div class="border-b">
        <div class="flex h-16 items-center px-4">
            <!--            <TeamSwitcher/>-->
            <DashboardMainNav class="mx-6"/>
            <div class="ml-auto flex items-center space-x-4">
                <ThemeToggle/>
                <!--                <Search/>-->
                <UserNav/>
            </div>
        </div>
    </div>

    <slot/>
</div>