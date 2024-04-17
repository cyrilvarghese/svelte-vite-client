<script lang="ts">
    import { Button, buttonVariants } from "$lib/components/ui/button/index.js";
    import * as Dialog from "$lib/components/ui/dialog/index.js";
    import { Plus } from "lucide-svelte";
    import AddJobForm from "./add-job-form.svelte";
    import { createEventDispatcher } from "svelte";
    import { onMount } from "svelte";
    import BadgeList from "../molecules/badge-list.svelte";
    import * as Select from "$lib/components/ui/select/index.js";
    import { tagsList } from "../store/projectStore";

    import type { Tag } from "src/types";
    import type { Selected } from "bits-ui";
    import AddTagForm from "./add-tag-form.svelte";
    export let documentText = "";
    export let tags: Tag[];
    let allTags: Tag[];
    tagsList.subscribe((tags) => {
        allTags = tags;
    });
    // Function to convert tag array to label-value pairs

    function convertTagsToSelected(tags: Tag[]): Selected<string>[] {
        return tags.map((tag) => ({
            value: tag.name, // Using the tag's name as the value
            label: tag.name, // Using the tag's description as the label
        }));
    }
    // Function to find matching tags
    function findMatchingTags(selectedValues: Selected<string>[]): Tag[] {
        return selectedValues.map((tagName) => {
            const foundTag = allTags.find((tag) => tag.name === tagName.value);
            if (!foundTag) {
                throw new Error(`No tag found for the name: ${tagName.value}`);
            }
            return foundTag;
        });
    }
    let handleSelectionChange: any = function (
        selectedValues: Selected<string>[],
    ) {
        tags = findMatchingTags(selectedValues);
        debugger;
    };
</script>

<Dialog.Root>
    <Dialog.Trigger>
        <slot><!-- optional fallback --></slot>
    </Dialog.Trigger>

    <Dialog.Content class="sm:max-w-[750px] sm:max-h-[80%] overflow-auto ">
        <Dialog.Header class="sticky">
            <Dialog.Title>Edit Chunk</Dialog.Title>
        </Dialog.Header>

        <p class="text-md">{documentText}</p>
        <input class="h-0 m-0 p-0" style="position: absolute;" type="text" />
        <BadgeList {tags} />
        <AddTagForm />
        <Select.Root
            multiple
            selected={convertTagsToSelected(tags)}
            onSelectedChange={handleSelectionChange}
        >
            <Select.Trigger>
                <Select.Value placeholder="Select a tag" />
            </Select.Trigger>
            <Select.Content>
                {#each allTags as tag}
                    <Select.Item value={tag.name}>{tag.name}</Select.Item>
                {/each}
            </Select.Content>
        </Select.Root>

        <Dialog.Footer class="flex flex-row items-start">
            <Button>Update Tags</Button>
        </Dialog.Footer>
    </Dialog.Content>
</Dialog.Root>
