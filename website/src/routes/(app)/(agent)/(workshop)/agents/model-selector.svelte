<script lang="ts">
    import * as HoverCard from "$components/hover-card";
    import {Label} from "$components/label";
    import type {ModelType, Model} from "./models";
    import {Button} from "$components/button";
    import * as Command from "$components/command";
    import CaretSort from "svelte-radix/CaretSort.svelte";
    import * as Popover from "$components/popover";
    import {tick} from "svelte";
    import ModelItem from "./model-item.svelte";
    import {Badge} from "$components/badge";
    import { createEventDispatcher } from 'svelte';

    const dispatch = createEventDispatcher();
    export let types: ModelType[];
    export let models: Model[];
    export let selected: string[];

    let selectedModel = models[0];
    let peekedModel: Model | undefined = undefined;
    let open = false;
    $: selectedValues  = selected ?? [];

    function onPopoverOpenChange(open: boolean) {
        if (open) {
            peekedModel = selectedModel;
        } else {
            peekedModel = undefined;
        }
    }

    $: hoverCardIsOpen = open && peekedModel !== undefined;

    function handlePeek(model: Model) {
        if (peekedModel === undefined) {
            if (!open) return;
            peekedModel = model;
            return;
        }
        peekedModel = model;
    }

    function handleSelect(model_id: number) {
        if (selectedValues.includes(model_id)) {
            selectedValues = selectedValues.filter((f) => f !== model_id);
        } else {
            selectedValues.push(model_id);
        }
        selectedValues = selectedValues
        dispatch('change', selectedValues);
    }

    function onPopoverOutsideClick() {
        peekedModel = undefined;
    }
</script>

<Popover.Root
        bind:open
        let:ids
        onOutsideClick={onPopoverOutsideClick}
        onOpenChange={onPopoverOpenChange}
>
    <Popover.Trigger asChild let:builder>
        <Button
                builders={[builder]}
                variant="outline"
                role="combobox"
                aria-expanded={open}
                class=" justify-between "
        >
            {#if selectedValues.length === 0}
                <span class="text-muted-foreground text-sm">Select a model...</span>
            {:else}
                <div class="flex space-x-1 max-w-[32rem] overflow-hidden">
                {#each selectedValues as value}
                    {@const model = models.find((f) => f.id === value)}
                    <Badge class="mr-2" variant="primary" size="sm">
                        {model.name}
                    </Badge>
                {/each}
                </div>
            {/if}
            <CaretSort class="ml-2 h-4 w-4 shrink-0 opacity-50"/>
        </Button>
    </Popover.Trigger>
    <Popover.Content class="w-[18rem] p-0 absolute self-end items-end">
        <HoverCard.Root
                closeOnOutsideClick={false}
                open={hoverCardIsOpen}
                openDelay={0}
                portal={null}
        >
            <HoverCard.Content class="-ml-2 min-h-[280px]" side="left" align="start">
                {#if peekedModel && hoverCardIsOpen}
                    <div class="grid gap-2">
                        <h4 class="font-medium leading-none">
                            {peekedModel.name}
                        </h4>
                        <div class="text-sm text-muted-foreground">
                            {peekedModel.description}
                        </div>
                        {#if peekedModel.strengths}
                            <div class="mt-4 grid gap-2">
                                <h5 class="text-sm font-medium leading-none">Strengths</h5>
                                <ul class="text-sm text-muted-foreground">
                                    {peekedModel.strengths}
                                </ul>
                            </div>
                        {/if}
                    </div>
                {/if}
            </HoverCard.Content>
            <Command.Root loop>
                <Command.Input placeholder="Search Models...."/>
                <Command.List class="h-[var(--cmdk-list-height)] max-h-[18rem]">
                    <Command.Empty>No models found.</Command.Empty>
                    {#each types as type}
                        <Command.Group heading={type}>
                            {#each models.filter((model) => model.type === type) as model}
                                <HoverCard.Trigger asChild let:builder>
                                    <div
                                            use:builder.action
                                            {...builder}
                                            role="button"
                                            tabindex={0}
                                    >
                                        <ModelItem
                                                {model}
                                                onSelect={() => handleSelect(model.id)}
                                                onPeek={() => handlePeek(model)}
                                                isSelected={selectedValues.includes(model.id)}
                                        />
                                    </div>
                                </HoverCard.Trigger>
                            {/each}
                        </Command.Group>
                    {/each}
                </Command.List>
            </Command.Root>
        </HoverCard.Root>
    </Popover.Content>
</Popover.Root>