<script context="module">
    import SkillCard from '../routes/(dashboard)/workshop/tabs/skills/skill-card.svelte';

    export const meta = {
        title: "SkillCard",
        component: SkillCard
    }

    import {Story, Template} from '@storybook/addon-svelte-csf';
    import {SavedSkillSpecification} from "api-client";

    // export let name: String, code: String;
    const skill = new SavedSkillSpecification();
    skill.name = name
    skill.code = code
</script>


<Template let:args>
    Hello
    <!--    <SkillCard {skill}-->

    <!--    />-->
</Template>

<!--<Story name="Rounded" args={{rounded: true}}/>-->

<!--<Story name="Square" source args={{rounded: false}}/>-->

<!-- Dynamic snippet should be disabled for this story -->
<Story name="Default">
    <!--    Hello-->
    <SkillCard {skill}/>
</Story>