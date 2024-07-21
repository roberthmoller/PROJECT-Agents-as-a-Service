<script lang="ts">
    import {Command, UserCog, LogIn} from 'lucide-svelte';
    import {authState} from "$lib/firebase";
    import ContactForm from "./contact-form.svelte";
    import type { PageData } from "./$types.js";
    export let data: PageData;
    $: state = $authState
    $: isLoggedIn = state.isLoggedIn
</script>

<section id="home" class="w-full py-12 md:py-24 lg:py-32">
    <div class="container px-4 md:px-6">
        <div class="flex flex-col items-center justify-center space-y-4 text-center py-12">
            <div class="space-y-2">
                <div class="inline-block rounded-lg bg-gray-100 px-3 py-1 text-sm dark:bg-gray-800">New Platform</div>
                <h2 class="text-3xl font-bold tracking-tighter sm:text-5xl">Agent-as-a-Service</h2>
                <p class="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                    Craft custom AI agents tailored to your needs with unique personalities, equipped with the skills to
                    perform tasks autonomously. Revolutionize the way you work by deploying a scalable team of
                    AI-powered agents today.
                </p>
            </div>
        </div>
        <div class="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-2 lg:gap-12">
            <img
                    alt="Image"
                    class="mx-auto aspect-video overflow-hidden rounded-xl object-cover object-[0,-50px] sm:w-full lg:order-last"
                    height="310"
                    src="/robot_discussion.webp"
                    width="550"

            />
            <div class="flex flex-col justify-center space-y-4">
                <ul class="grid gap-6">
                    <li>
                        <div class="grid gap-1">
                            <h3 class="text-xl font-bold">Customization</h3>
                            <p class="text-gray-500 dark:text-gray-400">
                                Design agents with specific skills, personalities, and problem-solving abilities to fit
                                your unique business requirements.
                            </p>
                        </div>
                    </li>
                    <li>
                        <div class="grid gap-1">
                            <h3 class="text-xl font-bold">Plug-and-Play</h3>
                            <p class="text-gray-500 dark:text-gray-400">
                                Seamlessly incorporate AI agents into your existing systems with minimal coding effort,
                                thanks to our user-friendly interface.
                            </p>
                        </div>
                    </li>
                    <li>
                        <div class="grid gap-1">
                            <h3 class="text-xl font-bold">24/7 Productivity</h3>
                            <p class="text-gray-500 dark:text-gray-400">
                                Keep your operations running around the clock with AI agents that never sleep, boosting
                                your productivity and bottom line.
                            </p>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</section>

<section id="features" class="w-full py-12 md:py-24 lg:py-32">
    <div class="container px-4 md:px-6">
        <div class="flex flex-col items-center justify-center space-y-4 text-center">
            <div class="space-y-2">
                <h2 class="text-3xl font-bold tracking-tighter sm:text-5xl">Features</h2>
                <p class="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                    Explore the capabilities of our AI Assistant that will transform the way you work.
                </p>
            </div>
        </div>
        <div class="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-2 lg:gap-12">
            <div class="flex flex-col items-start space-y-4">
                <h3 class="text-xl font-bold">Code Skills</h3>
                <p class="text-gray-500 dark:text-gray-400">
                    Elevate the capabilities of your AI agents with our platform's advanced script integration feature.
                    Inject Python scripts to arm your agents with an array of functions, from automated data parsing to
                    sophisticated algorithmic decision-making. This empowers you to create highly specialized agents
                    capable of performing a vast range of tasks, tailor-made to fit your operational needs.
                </p>
            </div>
            <img
                    alt="Image"
                    class="mx-auto aspect-video overflow-hidden rounded-xl object-cover object-[0,-50px] sm:w-full"
                    height="310"
                    src="/robot_email.webp"
                    width="550"
            />
            <img
                    alt="Image"
                    class="mx-auto aspect-video overflow-hidden rounded-xl object-cover object-[0,-50px] sm:w-full"
                    height="310"
                    src="/robots_talking.webp"
                    width="550"
            />
            <div class="flex flex-col items-start space-y-4">
                <h3 class="text-xl font-bold">Group Sessions</h3>
                <p class="text-gray-500 dark:text-gray-400">
                    Enabling agents to communicate together and coordinate actions for complex problem-solving
                    scenarios. By
                    leveraging shared knowledge bases and collaborative decision processes, they can autonomously
                    resolve multifaceted issues more efficiently, reducing the need for human intervention and ensuring
                    seamless operations.
                </p>
            </div>
        </div>
    </div>
</section>


<!--<section id="pricing" class="w-full py-12 md:py-24 lg:py-32">-->
<!--    <div class="container px-4 md:px-6">-->
<!--        <div class="flex flex-col items-center justify-center space-y-4 text-center">-->
<!--            <div class="space-y-2">-->
<!--                <div class="inline-block rounded-lg bg-gray-100 px-3 py-1 text-sm dark:bg-gray-800">Pricing</div>-->
<!--                <h2 class="text-3xl font-bold tracking-tighter sm:text-5xl">Choose the perfect plan</h2>-->
<!--                <p class="max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">-->
<!--                    Get started with Acme Vision today. Select the right plan for your team.-->
<!--                </p>-->
<!--            </div>-->
<!--        </div>-->
<!--        <div class="mx-auto grid max-w-5xl items-start gap-6 py-12 lg:grid-cols-3 lg:gap-12">-->
<!--            <div class="flex flex-col items-center justify-center space-y-2 border rounded-xl p-4 shadow-sm bg-gray-50 dark:bg-gray-950">-->
<!--                <div class="space-y-2">-->
<!--                    <h3 class="font-bold tracking-tighter">Starter</h3>-->
<!--                    <p class="text-3xl font-bold tracking-tighter">$19</p>-->
<!--                    <p class="text-xs text-gray-500 dark:text-gray-400">Perfect for small teams getting started</p>-->
<!--                </div>-->
<!--                <a-->
<!--                        class="inline-flex h-9 items-center justify-center rounded-md border border-gray-200 border-gray-200 bg-white px-4 text-sm font-medium shadow-sm transition-colors hover:bg-gray-100 hover:text-gray-900 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:border-gray-800 dark:border-gray-800 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus-visible:ring-gray-300"-->
<!--                        href="#"-->
<!--                >-->
<!--                    Contact Sales-->
<!--                </a>-->
<!--            </div>-->
<!--            <div class="flex flex-col items-center justify-center space-y-2 border rounded-xl p-4 shadow-sm bg-gray-50 dark:bg-gray-950">-->
<!--                <div class="space-y-2">-->
<!--                    <h3 class="font-bold tracking-tighter">Pro</h3>-->
<!--                    <p class="text-3xl font-bold tracking-tighter">$49</p>-->
<!--                    <p class="text-xs text-gray-500 dark:text-gray-400">Advanced features for the professional team</p>-->
<!--                </div>-->
<!--                <a-->
<!--                        class="inline-flex h-9 items-center justify-center rounded-md bg-gray-900 px-4 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-gray-900/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90 dark:focus-visible:ring-gray-300"-->
<!--                        href="#"-->
<!--                >-->
<!--                    Get Started-->
<!--                </a>-->
<!--            </div>-->
<!--            <div class="flex flex-col items-center justify-center space-y-2 border rounded-xl p-4 shadow-sm bg-gray-50 dark:bg-gray-950">-->
<!--                <div class="space-y-2">-->
<!--                    <h3 class="font-bold tracking-tighter">Enterprise</h3>-->
<!--                    <p class="text-3xl font-bold tracking-tighter">$99</p>-->
<!--                    <p class="text-xs text-gray-500 dark:text-gray-400">Custom solutions for the enterprise</p>-->
<!--                </div>-->
<!--                <a-->
<!--                        class="inline-flex h-9 items-center justify-center rounded-md border border-gray-200 border-gray-200 bg-white px-4 text-sm font-medium shadow-sm transition-colors hover:bg-gray-100 hover:text-gray-900 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:border-gray-800 dark:border-gray-800 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus-visible:ring-gray-300"-->
<!--                        href="#"-->
<!--                >-->
<!--                    Contact Sales-->
<!--                </a>-->
<!--            </div>-->
<!--        </div>-->
<!--    </div>-->
<!--</section>-->


<section id="contact" class="w-full py-12 md:py-24 lg:py-32 pb-28">
    <div class="container px-4 md:px-6">
        <div class="grid gap-10 sm:px-10 md:gap-16 md:grid-cols-2">
            <div class="space-y-4">
                <ContactForm data={data.form} />
            </div>

            <div class="space-y-4">
                <div class="inline-block rounded-lg bg-gray-100 px-3 py-1 text-sm dark:bg-gray-800">Performance</div>
                <h2 class="lg:leading-tighter text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl xl:text-[3.4rem] 2xl:text-[3.75rem]">
                    The AI Assistant that adapts to your workflow.
                </h2>
                <a
                        class="inline-flex h-9 items-center justify-center rounded-md bg-gray-900 px-4 py-2 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-gray-900/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90 dark:focus-visible:ring-gray-300"
                        href="#"
                >
                    Get started
                </a>
            </div>
        </div>
    </div>
</section>

<!--<section class="w-full py-12 md:py-24 lg:py-32">-->
<!--    <div class="container px-4 md:px-6">-->
<!--        <div class="grid gap-10 sm:px-10 md:gap-16 md:grid-cols-2">-->

<!--        </div>-->
<!--    </div>-->
<!--</section>-->


<nav class="fixed bottom-0 left-0 w-full py-8 px-6 z-10 flex justify-around">
    <div class="container flex justify-center gap-6 w-fit rounded-3xl py-2 backdrop-blur-xl border">
        <a class="text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50" href="#">
            <Command class="w-4"/>
        </a>
        <a class="text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50 md:block hidden" href="#features">
            Features
        </a>
        <!--        <a class="text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50 md:block hidden" href="#pricing">-->
        <!--            Pricing-->
        <!--        </a>-->

        <a class="text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50 md:block hidden" href="#contact">
            Contact
        </a>


        <span class="text-border md:block hidden">|</span>


        {#if isLoggedIn}
            <a class="text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50" href="/chat">
                Chat
            </a>
            <a class="text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50" href="/skills">
                Workshop
            </a>
            <a class="text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50 md:block hidden" href="/account">
                <UserCog class="w-4"/>
            </a>
        {:else}
            <a class="text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50" href="/login">
                Get Started
            </a>

            <a class="text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50 md:block hidden" href="/login">
                <LogIn class="w-4"/>
            </a>
        {/if}
    </div>
</nav>
