import {PUBLIC_FORM_ACCESS_KEY} from '$env/static/public';
import { fail } from "@sveltejs/kit";
import type {PageServerLoad} from "./$types.js";
import {superValidate} from "sveltekit-superforms";
import {formSchema} from "./schema";
import {zod} from "sveltekit-superforms/adapters";

export const load: PageServerLoad = async () => {
    return {
        form: await superValidate(zod(formSchema)),
    };
};

export const actions = {
    default: async (event) => {
        const form = await superValidate(event, zod(formSchema));
        if (!form.valid) {
            return fail(400, {
                form,
            });
        }
        const {name,email, message} = form.data;
        console.log({name, email, message});

        const json = JSON.stringify({
            "access_key": PUBLIC_FORM_ACCESS_KEY,
            name, email, message
        });

        const response = await fetch("https://api.web3forms.com/submit", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
            body: json
        });
        const result = await response.json();

        return {
            form,
            result
        };
    }
};