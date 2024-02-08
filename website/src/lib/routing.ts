import {goto} from "$app/navigation";
export async function gotoHome() {
    await goto("/home", {replaceState: true})
}

export async function gotoLogin() {
    await goto("/login", {replaceState: true})
}

export async function gotoLogout() {
    await goto("/logout", {replaceState: true})
}

export async function gotoLanding() {
    await goto("/", {replaceState: true})
}