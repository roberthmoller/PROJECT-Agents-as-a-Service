<script lang="ts">
    import {UserPlus} from "lucide-svelte";
    import CreateSkillDialog from "./create-skill-dialog.svelte";
</script>
<div class="flex p-4 shrink-0 items-center justify-center rounded-md border border-dashed">
    <div class="mx-auto flex max-w-[420px] flex-col items-center justify-center text-center">
        <UserPlus/>
        <h3 class="mt-4 text-lg font-semibold">Create a skill</h3>
        <p class="mb-4 mt-2 text-sm text-muted-foreground">
            Define a new skill or integration.
        </p>
        <CreateSkillDialog/>
    </div>
</div>