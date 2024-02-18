<script lang="ts">
    import {ChatSidebar, ChatWindow, NoChatWindow} from "./";
    import {activeSession} from "$lib/services";

    $: session = $activeSession;
</script>

<div class="bg-background h-full">
    <div class="grid md:grid-cols-5 h-full">
        <!--        Should be lg-->
        <!--    <div class="grid lg:grid-cols-5 h-full">-->
        <div class="hidden md:block">
            <!--        Should be lg-->
            <!--        <div class="hidden lg:block">-->
            <ChatSidebar/>
        </div>

        <div class="col-span-3 lg:col-span-4 lg:border-l">
            {#if session}
                <ChatWindow/>
            {:else}
                <NoChatWindow/>
            {/if}
        </div>
    </div>
</div>
