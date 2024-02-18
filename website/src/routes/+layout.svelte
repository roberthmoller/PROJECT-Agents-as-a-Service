<script lang="ts">
    import "../app.pcss";
    import {ModeWatcher} from "mode-watcher";
    import {Toaster} from "$lib/components/ui/sonner";
</script>

<ModeWatcher/>
<Toaster/>
<div class="h-full">
    <slot/>
</div>