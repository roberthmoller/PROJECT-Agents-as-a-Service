<script lang="ts">
    import {Separator} from "$components/separator";
    import {Button} from "$components/button";
    import * as Form from "$components/form";
    import {zodClient} from "sveltekit-superforms/adapters";
    import {type Infer, superForm, type SuperValidated} from "sveltekit-superforms";
    import SuperDebug from "sveltekit-superforms";

</script>

<div class="space-y-6">
    <div>
        <h3 class="text-lg font-medium">Account</h3>
        <p class="text-sm text-muted-foreground">This is how others will see you on the site.</p>
    </div>
    <Separator/>

    <form class="space-y-8">
        <!--Display name-->
        <!--Email-->
        <!--Password?-->
        <!--Save-->
    </form>
</div>