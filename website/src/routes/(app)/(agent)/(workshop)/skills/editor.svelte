<script lang="ts">
    import {onMount} from 'svelte';
    import {EditorState} from '@codemirror/state';
    import {EditorView, lineNumbers, keymap} from '@codemirror/view';
    import {defaultKeymap} from '@codemirror/commands';
    import {python} from '@codemirror/lang-python';
    import {javascript} from '@codemirror/lang-javascript';
    import {oneDark} from '@codemirror/theme-one-dark';
    import {autocompletion, completionKeymap} from '@codemirror/autocomplete';
    import {hotkey as hk} from "svelte-gh-hotkey";

    export let
        code = "",
        language: 'python' | 'javascript' | 'txt' = 'python',
        hotkey: String | undefined = undefined

    let editor: Element;

    const customTheme = EditorView.theme({
            "&": {
                flexGrow: 1,
                backgroundColor: "transparent",
                border: "1px solid #333",
                borderRadius: "0.25rem",

            },
            ".cm-gutters": {
                backgroundColor: "transparent",
                color: "#ddd",
                borderRight: "1px solid #333",
                width: "2.5em",
                paddingLeft: "0.5em",
            }

        },
        {dark: true}
    );

    const extensions = [
        keymap.of([...defaultKeymap, ...completionKeymap]),
        customTheme,
        oneDark,
        lineNumbers(),
        autocompletion(),
        EditorView.updateListener.of(update => {
            if (update.docChanged) {
                code = update.state.doc.toString();
            }
        }),
    ];

    if (language === 'python') {
        extensions.push(python());
    } else if (language === 'javascript') {
        extensions.push(javascript());
    }

    onMount(() => {


        const state = EditorState.create({
            doc: code,
            extensions: extensions,
        });

        new EditorView({
            state: state,
            parent: editor,
        });
    });
</script>


<div bind:this={editor} class="border-1 border-b-red-50 {$$restProps.class || ''}" use:hk={hotkey}></div>
