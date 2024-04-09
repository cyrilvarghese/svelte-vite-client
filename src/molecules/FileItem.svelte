<script lang="ts">
    import { Separator } from "$lib/components/ui/separator";
    import { Checkbox } from "$lib/components/ui/checkbox";
    import { Label } from "$lib/components/ui/label";
    import type { File, Project } from "src/types";

    let checked: boolean | "indeterminate" | undefined;
    export let file: File;
    function onCheckedChange(isChecked: boolean |  "indeterminate") {
        console.log(isChecked);
        checked = isChecked;
    }
    const parentEventHandler = function () {
        checked = !checked;
        debugger;
    };
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<div
    role="button"
    tabindex="0"
    on:click={parentEventHandler}
    class="items-top flex space-x-2 hover:bg-muted flex-row items-start py-2 pl-2 pr-4 my-2 cursor-pointer rounded-sm {checked
        ? 'bg-muted '
        : ''}"
>
    <Checkbox id="file{file.id}" {checked} {onCheckedChange} />
    <div class="grid gap-1.5 leading-none w-[250px]">
        <Label
            for="file{file.id}"
            class="text-md hover:underline font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
            {file.name}
        </Label>
        <p class="text-sm text-muted-foreground">
            {file.created_at}
        </p>
    </div>
</div>
