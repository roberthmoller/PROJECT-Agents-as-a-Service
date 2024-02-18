<script>
    import {authState} from '$lib/firebase'

    $: auth = $authState;
</script>

{#if auth.isLoggedIn }
    <slot name="authenticated"></slot>
{:else if auth.isLoading}
    <div>Loading...</div>
{:else}
    <slot name="unauthenticated"></slot>
{/if}