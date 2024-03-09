<script lang="ts">
    import ThemeToggle from "$lib/theme-toggle.svelte";
    import {Command} from "lucide-svelte";
</script>


<div class="container relative w-full h-full flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
    <div class="absolute right-4 top-4 md:right-8 md:top-8">
        <ThemeToggle/>
    </div>
    <div class="relative hidden h-full flex-col bg-muted p-10 dark:border-r lg:flex">
        <!--             src="https://unsplash.com/photos/XUlsF9LYeVk/download?ixid=M3wxMjA3fDB8MXxhbGx8fHx8fHx8fHwxNzA4MTg2MDU0fA&force=true&w=640"-->
        <img class="absolute inset-0 bg-cover object-cover h-full w-full dark:invert grayscale"
             alt="A person working on a computer"
             src="https://unsplash.com/photos/7JX0-bfiuxQ/download?ixid=M3wxMjA3fDB8MXxhbGx8fHx8fHx8fHwxNzA4MTg2MTQ3fA&force=true&w=1920"
        />
        <a class="relative z-20 flex items-center text-lg font-medium" href="/">
            <Command class="h-5 mr-2"/>
            Agents as a Service
        </a>
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
