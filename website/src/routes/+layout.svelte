<script lang="ts">
    import "../app.pcss";
    import {ModeWatcher} from "mode-watcher";
    import {Toaster} from "$components/sonner";
</script>

<ModeWatcher/>
<Toaster/>
<div class="h-full">
    <slot/>
</div>