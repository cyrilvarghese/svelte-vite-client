<script lang="ts">
    import { Button } from "$lib/components/ui/button/index.js";
    import * as Dialog from "$lib/components/ui/dialog/index.js";
    import BadgeList from "../molecules/badge-list.svelte";
    import * as Select from "$lib/components/ui/select/index.js";
    import { tagsList } from "../store/tagStore";
    import type { MetadataUpdateRequest } from "../store/chunkStore";
    import { metadataStore } from "../store/chunkStore";

    import type { Tag } from "src/types";
    import type { Selected } from "bits-ui";
    import { createEventDispatcher } from "svelte";
    export let documentText = "";
    export let documentId = "";
    export let docMetadata: any;
    export let tags: Tag[];

    const dispatch = createEventDispatcher();
    let openModal: boolean = false;
    let allTags: Tag[];
    tagsList.subscribe((tags) => {
        allTags = tags;
    });
    // Function to convert tag array to label-value pairs

    function convertTagsToSelected(tags: Tag[]): Selected<string>[] {
        debugger;
        let convertedArr = tags.map((tag) => ({
            value: tag.id, // Using the tag's name as the value
            label: tag.name, // Using the tag's description as the label
        }));
        return convertedArr;
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
    };

    async function updateTagMetadata() {
        let req: MetadataUpdateRequest = {
            metadatas: [],
            doc_ids: [],
        };
        debugger;
        let tagsForMetadata = tags.map((tag) => {
            return { tag_name: tag.name, score: tag.score ? tag.score : 100 };
        });
        docMetadata.tags = JSON.stringify(tagsForMetadata);
        req.doc_ids.push(documentId);
        req.metadatas.push(docMetadata);
        await metadataStore.updateMetadataTags(req);
    }
    function handleOpenChange(isOpen: boolean) {
        openModal = isOpen; // Ensuring openModal is updated with dialog's state
    }

    function closeModal() {
        openModal = false;
        dispatch("openChange", { openModal });
    }
</script>

<Dialog.Root open={openModal} onOpenChange={handleOpenChange}>
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
                    <Select.Item value={tag.id}>{tag.name}</Select.Item>
                {/each}
            </Select.Content>
        </Select.Root>

        <Dialog.Footer class="flex flex-row items-start">
            <Button on:click={updateTagMetadata}>Update Tags</Button>
        </Dialog.Footer>
    </Dialog.Content>
</Dialog.Root>
