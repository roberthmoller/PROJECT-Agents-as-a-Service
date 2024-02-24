<script lang="ts">
    import * as Dialog from "$lib/components/ui/dialog";
    import * as Card from "$lib/components/ui/card";
    import {Button} from "$lib/components/ui/button";
    import SkillDialog from "./skill-dialog.svelte";
    import DeleteDialog from "../delete-dialog.svelte";
    import {SavedSkillSpecification} from "api-client";
    import {workshopStore} from "$lib/services";

    export let skill: SavedSkillSpecification;
    $: state = $workshopStore;

</script>

<Card.Root class="relative">
    <Card.Header class="flex flex-row items-center justify-between space-y-0 pb-2">
        <Card.Title class="text-sm font-medium">{skill.name}</Card.Title>
    </Card.Header>
    <Card.Content>
        <p class="text-sm text-muted-foreground h-[4rem]">
            {skill.description}
        </p>
    </Card.Content>
    <Card.Footer>
        <div class="flex w-full justify-end space-x-2">
            <SkillDialog {skill}/>
            <DeleteDialog on:delete={() => state.deleteSkill(skill)}>
                {skill.name}
            </DeleteDialog>
        </div>
    </Card.Footer>
</Card.Root>
