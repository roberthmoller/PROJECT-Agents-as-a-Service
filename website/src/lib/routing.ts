import {goto} from "$app/navigation";
export async function gotoChat() {
    await goto("/chat", {replaceState: true})
}
export async function gotoWorkshop() {
    await goto("/workshop", {replaceState: true})
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