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
    import {createEventDispatcher} from 'svelte';
    import {ModelProviderConnection} from "api-client";
    import {Check, Link, X} from "lucide-svelte";

    const dispatch = createEventDispatcher();
    export let providers: ModelProviderConnection[];
    export let selected: string[];

    interface ModelDetails {
        name: string;
        description: string;
        strengths: string;
    }

    const models = Array.from(providers).flatMap((f) => f.models);

    let selectedModel = null;
    let peekedModel: ModelDetails | undefined = undefined;
    let open = false;
    $: selectedValues = selected ?? [];

    function onPopoverOpenChange(open: boolean) {
        if (open) {
            peekedModel = selectedModel;
        } else {
            peekedModel = undefined;
        }
    }

    $: hoverCardIsOpen = open && peekedModel !== undefined;

    function handlePeek(model: ModelDetails) {
        if (peekedModel === undefined) {
            if (!open) return;
            peekedModel = model;
            return;
        }
        peekedModel = model;
    }

    function handleSelect(model_id: string) {
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
                class="justify-between overflow-fade-parent"
        >
            {#if selectedValues.length === 0}
                <span class="text-muted-foreground text-sm">Select a model...</span>
            {:else}
                <div class="flex space-x-1 max-w-[32rem] w-full overflow-hidden overflow-fade">
                    {#each selectedValues as value}
                        {@const model = models.find((f) => f.id === value)}
                        <Badge variant="primary" size="sm">
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

                        <div class="mt-4 grid gap-2">
                            <h5 class="text-sm font-medium leading-none">Capabilities</h5>
                            <ul class="text-sm text-muted-foreground">
                                {#if peekedModel.canCallSkills}
                                    <Badge variant="secondary" size="sm" class="w-fit">
                                        <Check class="h-4 w-4 mr-2"/>
                                        FUNCTION CALLING
                                    </Badge>
                                {:else}
                                    <Badge variant="destructive" size="sm" class="w-fit">
                                        <X class="h-4 w-4 mr-2"/>
                                        NO FUNCTION CALLING
                                    </Badge>
                                {/if}
                            </ul>

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
                    {#each providers as provider}
                        <Command.Group heading={provider.name}>
                            {#if !provider.isConnected}
                                <Button variant="ghost" size="sm" class="w-full !justify-start" href="/models">
                                    <Link class="h-3.5 w-3.5 mr-2"/>
                                    <span class="text-sm">Connect</span>
                                </Button>
                            {/if}
                            {#each provider.models as model}
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
                                                disabled={!provider.isConnected}
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

<style>
    .overflow-fade {
        position: relative;

        &:after {
            content: ' ';
            position: absolute;
            top: 0;
            bottom: 0;
            right: 0;
            width: 8rem;
            background: linear-gradient(90deg, rgba(0, 0, 0, 0) 0%, #09090b 100%);
            /*transition: all 0.15s cubic-bezier(0.4, 0, 0.2, 1);;*/
        }
    }


    :global(.overflow-fade-parent:hover:has(.overflow-fade)) {
        /*background-color: red;*/
        /*transition: all 0.15s cubic-bezier(0.4, 0, 0.2, 1);;*/

        & > .overflow-fade:after {
            background: linear-gradient(90deg, rgba(0, 0, 0, 0) 0%, #27272a 100%);

        }

        /*background: linear-gradient(90deg, rgba(0,0,0,0) 0%, rgba(0,0,0,1) 100%);*/
        /*&:after {*/
        /*    background: linear-gradient(90deg, rgba(0, 0, 0, 0) 0%, rgba(39, 39, 42, 1) 100%) !important;*/
        /*}*/
    }
</style>