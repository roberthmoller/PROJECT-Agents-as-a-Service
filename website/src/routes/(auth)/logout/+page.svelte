<script lang="ts">

    import {signOut, authState, auth} from '$lib/firebase';
    import {goto} from "$app/navigation";

    authState.subscribe(({user, isLoggedIn}) => {
        console.log('logout', isLoggedIn);
        if (isLoggedIn) {
            signOut(auth);
        } else {
            goto('/', {replaceState: true});
        }
    });
</script>

asd