<script lang="ts">
    import * as DropdownMenu from "$lib/components/ui/dropdown-menu";
    import * as Avatar from "$lib/components/ui/avatar";
    import {Button} from "$lib/components/ui/button";
    import {signOut, type User} from "firebase/auth";
    import {auth} from "$lib/firebase";

    export let user: User

    $: initials = user.displayName?.split(" ").map((n) => n[0]).join("").toUpperCase()
</script>

<DropdownMenu.Root>
    <DropdownMenu.Trigger asChild let:builder>
        <Button variant="ghost" builders={[builder]} class="relative h-8 w-8 rounded-full">
            <Avatar.Root class="h-8 w-8">
                <Avatar.Image src={user.photoURL} alt={user.displayName}/>
                <Avatar.Fallback>{initials}</Avatar.Fallback>
            </Avatar.Root>
        </Button>
    </DropdownMenu.Trigger>
    <DropdownMenu.Content class="w-56" align="end">
        <DropdownMenu.Label class="font-normal">
            <div class="flex flex-col space-y-1">
                <p class="text-sm font-medium leading-none">{user.displayName}</p>
                <p class="text-xs leading-none text-muted-foreground">{user.email}</p>
            </div>
        </DropdownMenu.Label>
        <DropdownMenu.Separator/>
        <DropdownMenu.Group>
            <DropdownMenu.Item>
                Profile
                <DropdownMenu.Shortcut>⇧⌘P</DropdownMenu.Shortcut>
            </DropdownMenu.Item>
            <DropdownMenu.Item>
                Billing
                <DropdownMenu.Shortcut>⌘B</DropdownMenu.Shortcut>
            </DropdownMenu.Item>
            <DropdownMenu.Item>
                Settings
                <DropdownMenu.Shortcut>⌘S</DropdownMenu.Shortcut>
            </DropdownMenu.Item>
            <DropdownMenu.Item>New Team</DropdownMenu.Item>
        </DropdownMenu.Group>
        <DropdownMenu.Separator/>
        <DropdownMenu.Item on:click={() => signOut(auth)}>
            Log out
            <DropdownMenu.Shortcut>⇧⌘Q</DropdownMenu.Shortcut>
        </DropdownMenu.Item>
    </DropdownMenu.Content>
</DropdownMenu.Root>