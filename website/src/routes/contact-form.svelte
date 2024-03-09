<script lang="ts">
    import {Input} from '$components/input';
    import {Label} from '$components/Label';
    import {Textarea} from '$components/textarea';
    import {Button} from '$components/button';
    import * as Form from "$components/form";
    import {browser} from "$app/environment";
    import SuperDebug, {
        type SuperValidated,
        type Infer,
        superForm
    } from "sveltekit-superforms";
    import {zodClient} from "sveltekit-superforms/adapters";
    import {toast} from "svelte-sonner";
    import {formSchema, type FormSchema} from "./schema";

    export let data: SuperValidated<Infer<FormSchema>>;

    const form = superForm(data, {
        validators: zodClient(formSchema),
        onUpdated: ({ form: f }) => {
            if (f.valid) {
                toast.success("Message sent");
            } else {
                toast.error("Please fix the errors in the form.");
            }
        }
    });

    const {form: formData, enhance} = form;
</script>

<div class="inline-block rounded-lg bg-gray-100 px-3 py-1 text-sm dark:bg-gray-800">Contact Form</div>
<h2 class="lg:leading-tighter text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl xl:text-[3.4rem] 2xl:text-[3.75rem]">
    Get in Touch with Us
</h2>
<form class="grid gap-4" method="POST" use:enhance>
    <Form.Field {form} name="name">
        <Form.Control let:attrs>
            <Form.Label>Name</Form.Label>
            <Form.Description>What is your name?</Form.Description>
            <Input {...attrs} bind:value={$formData.name} placeholder="Your name"/>
        </Form.Control>
        <Form.FieldErrors/>
    </Form.Field>

    <Form.Field {form} name="email">
        <Form.Control let:attrs>
            <Form.Label>Email</Form.Label>
        <Form.Description>Which email can I contact you on?</Form.Description>
            <Input {...attrs} bind:value={$formData.email} placeholder="Your email" type="email"/>
        </Form.Control>
        <Form.FieldErrors/>
    </Form.Field>

    <Form.Field {form} name="message">
        <Form.Control let:attrs>
            <Form.Label>Message</Form.Label>
        <Form.Description>What would you like to say?</Form.Description>
            <Textarea {...attrs} bind:value={$formData.message} class="min-h-[100px]" id="message"
                      placeholder="Your message"/>
        </Form.Control>
        <Form.FieldErrors/>
    </Form.Field>
    <Form.Button>Send Message</Form.Button>
</form>