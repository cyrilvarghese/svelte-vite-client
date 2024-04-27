<script lang="ts">
    import { Checkbox } from "$lib/components/ui/checkbox";
    import * as Dialog from "$lib/components/ui/dialog/index.js";
    import {
        snippetStore,
        type QueryRequest,
        type Snippet,
        selectedSnippets,
    } from "../store/vectorRetrieverStore";
    export let documentText = "";
    export let orignalSrc = "";
    export let fileSrc = "";
    let checked: boolean | string = false;
    function handleChecked(isChecked: boolean | string, text: string) {
        checked = isChecked;
        selectedSnippets.update((currentSnippets) => {
            const index = currentSnippets.indexOf(text);
            if (index > -1) {
                currentSnippets.splice(index, 1); // Remove if exists
            } else {
                currentSnippets.push(text); // Add if not exists
            }
            console.log(currentSnippets);

            return currentSnippets;
        });
    }
</script>

<Checkbox
    class="mr-4"
    onCheckedChange={(isChecked) => handleChecked(isChecked, documentText)}
/>
<Dialog.Root>
    <Dialog.Trigger
        class="bg-white hover:bg-accent  rounded-lg hover:shadow {checked
            ? 'shadow-md'
            : ''}"
    >
        <slot><!-- optional fallback --></slot>
    </Dialog.Trigger>

    <Dialog.Content class="sm:max-w-[750px] sm:max-h-[80%] overflow-auto ">
        <Dialog.Header class="sticky">
            <Dialog.Title>Snippet Details</Dialog.Title>
        </Dialog.Header>

        <p class="text-md">{documentText}</p>
        <input class="h-0 m-0 p-0" style="position: absolute;" type="text" />
        <Dialog.Footer>
            <a
                class="relative rounded hover:bg-muted hover:underline px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold m-2"
                href={orignalSrc}
                target="_blank">View Original Article</a
            >
            <a
                class="relative rounded hover:bg-muted hover:underline px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold m-2"
                href={fileSrc}
                target="_blank">View File from Research Base</a
            >
        </Dialog.Footer>
    </Dialog.Content>
</Dialog.Root>
