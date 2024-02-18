<script lang="ts">
    import {CodeJar} from "@novacbn/svelte-codejar"
    import 'highlight.js/styles/base16/dracula.css';

    let value = `# Python
print("Hello, World!")
print("")`;


    function highlight(code: string, language?: string): string {
        return code;
        // return '<pre class="prism-live language-python"><code >' + code + '</code></pre>';
    }
</script>

<svelte:head>
    <script src="https://cdn.jsdelivr.net/npm/prismjs@1.29.0/prism.min.js"></script>
    <!--    <script src="https://cdn.jsdelivr.net/npm/prismjs@1.29.0/plugins/line-numbers/prism-line-numbers.min.js"></script>-->
    <script src="https://cdn.jsdelivr.net/npm/prismjs@1.29.0/components/prism-python.min.js"/>
    <!--        <script src="https://cdn.jsdelivr.net/npm/prismjs@1.29.0/components/prism-python.js"></script>-->
    <!--    <link href="https://cdn.jsdelivr.net/npm/prismjs@1.29.0/themes/prism.min.css" rel="stylesheet">-->
    <link href="https://cdn.jsdelivr.net/npm/prismjs@1.29.0/themes/prism-okaidia.min.css" rel="stylesheet">
    <script src="https://raw.githubusercontent.com/PrismJS/live/master/index.js"/>
    <link href="https://live.prismjs.com/prism-live.css" rel="stylesheet">
</svelte:head>


<CodeJar
        tab={"\t"}
        {highlight}
        withLineNumbers={true}

        onUpdate={(code) => {
            value = code;
        }}
        value={value}
/>