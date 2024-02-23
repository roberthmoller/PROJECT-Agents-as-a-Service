<script lang="ts">
    import * as Dialog from "$lib/components/ui/dialog";
    import * as Card from "$lib/components/ui/card";
    import {SavedSkillSpecification} from "restClient";
    import {Button} from "$lib/components/ui/button";
    import EditSkillDialog from "./edit-skill-dialog.svelte";
    import DeleteSkillDialog from "./delete-skill-dialog.svelte";
    export let skill: SavedSkillSpecification;
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
            <!--            <Button variant="ghost">Edit</Button>-->
            <EditSkillDialog {skill}/>
            <DeleteSkillDialog on:delete={() => console.log("delete skill", skill.name)}>{skill.name}</DeleteSkillDialog>
        </div>
    </Card.Footer>
</Card.Root>
