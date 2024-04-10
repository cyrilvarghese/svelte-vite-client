<script lang="ts">
    import { Separator } from "$lib/components/ui/separator";
    import { Checkbox } from "$lib/components/ui/checkbox";
    import { Label } from "$lib/components/ui/label";
    import type { File, Project } from "src/types";
    import { FileText } from "lucide-svelte";

    export let checked: boolean | "indeterminate" | undefined;
    /**
     * Determines the variant of the component, which affects its styling and potentially its behavior.
     * - "simple" for a basic variant without additional features.
     * - "w-checkbox" for a variant that includes a checkbox.
     *
     * @prop {'simple' | 'w-checkbox'} variant - The variant type.
     */
    export let variant: "simple" | "w-checkbox";
    export let file: File;
    /**
     * Enum for specifying the variant of the component.
     * @enum {string}
     */

    function onCheckedChange(isChecked: boolean | "indeterminate") {
        console.log(isChecked);
        checked = isChecked;
    }
    const fileItemClicked = function () {
        console.log(file.id)
        checked = !checked;
       
    };
</script>

{#if variant === "w-checkbox"}
    <!-- content here -->
    <!-- svelte-ignore a11y-click-events-have-key-events -->

    <div
        role="button"
        tabindex="0"
        on:click={fileItemClicked}
        class="items-top flex space-x-2 hover:bg-muted flex-row items-start py-1 pl-2 pr-4 my-2.5 cursor-pointer rounded-sm {checked
            ? 'bg-muted '
            : ''}"
    >
        <Checkbox id="file{file.id}" {checked} {onCheckedChange} />
        <div class="grid gap-1.5 leading-none w-[250px]">
            <Label
                for="file{file.id}"
                class="text-md hover:underline font-medium leading-none  "
            >
                {file.name}
            </Label>
            <p class="text-sm text-muted-foreground">
                {file.created_at}
            </p>
        </div>
    </div>
{:else}
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <div
        role="button"
        tabindex="0"
        on:click={fileItemClicked}
        class="rounded-md flex flex-row hover:bg-muted hover:underline cursor-pointer flex-start items-center border align-baseline px-4 py-3 font-mono text-sm w-[320px] mb-2 {checked
            ? 'bg-muted '
            : ''}"
    >
        <FileText class="mr-2" />
        {file.name}
    </div>
{/if}
