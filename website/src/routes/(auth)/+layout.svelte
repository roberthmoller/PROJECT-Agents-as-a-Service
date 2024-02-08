<script lang="ts">
    import ThemeToggle from "$lib/theme-toggle.svelte";
</script>


<div class="container relative w-full h-full flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
    <div class="absolute right-4 top-4 md:right-8 md:top-8">
        <ThemeToggle/>
    </div>
    <div class="relative hidden h-full flex-col bg-muted p-10 text-white dark:border-r lg:flex">
        <img class="absolute inset-0 bg-cover object-cover h-full w-full"
             src="https://images.unsplash.com/photo-1590069261209-f8e9b8642343?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1376&q=80"
             alt="A person working on a computer"
        />
        <div class="relative z-20 flex items-center text-lg font-medium">
            Agents as a Service
        </div>
        <!--        <div class="relative z-20 mt-auto">-->
        <!--            <blockquote class="space-y-2">-->
        <!--                <p class="text-lg">-->
        <!--                    &ldquo;This library has saved me countless hours of work and helped me deliver-->
        <!--                    stunning designs to my clients faster than ever before. Highly-->
        <!--                    recommended!&rdquo;-->
        <!--                </p>-->
        <!--                <footer class="text-sm">Sofia Davis</footer>-->
        <!--            </blockquote>-->
        <!--        </div>-->
    </div>
    <slot/>
</div>
