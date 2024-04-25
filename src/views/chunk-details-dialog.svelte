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
    import { Check, LoaderCircle } from "lucide-svelte";
    export let documentText = "";
    export let documentId = "";
    export let document: any;
    export let tags: Tag[];

    const dispatch = createEventDispatcher();
    let isLoading = false;
    let openModal: boolean = false;
    let allTags: Tag[];
    tagsList.subscribe((tags) => {
        allTags = tags;
    });
    // Function to convert tag array to label-value pairs

    function convertTagsToSelected(tags: Tag[]): Selected<string>[] {
        let convertedArr: any = tags.map((tag) => ({
            value: tag.id, // Using the tag's name as the value
            label: tag.name, // Using the tag's description as the label
        }));
        return convertedArr;
    }
    // Function to find matching tags
    function findMatchingTags(selectedValues: Selected<string>[]): Tag[] {
        return selectedValues.map((tagName) => {
            const foundTag = allTags.find((tag) => tag.id === +tagName.value);
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
        isLoading = true;
        let req: MetadataUpdateRequest = {
            docs: [],
            doc_ids: [],
            
        };

        let tagsForMetadata = tags.map((tag) => {
            debugger;
            return {
                tag_id: tag.id, 
                tag_name: tag.name,
                score: tag.score ? tag.score : 100,
            };
        });
        console.log("new tags --------------", tagsForMetadata);
        document.metadata.tags = JSON.stringify(tagsForMetadata);
        req.doc_ids.push(documentId);
        req.docs.push(document);

        await metadataStore.updateMetadataTags(req);
        isLoading = false;

        openModal = false;
        dispatch("refreshChunks");
    }
    function handleOpenChange(isOpen: boolean) {
        openModal = isOpen; // Ensuring openModal is updated with dialog's state
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
            disabled={isLoading}
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
            {#if isLoading}
                <Button class="w-[150px]" disabled>
                    <LoaderCircle class="mr-2 h-4 w-4 animate-spin " />
                    Please wait
                </Button>
            {:else}
                <Button on:click={updateTagMetadata}>
                    <Check class="h-4 w-4 mr-2" />Update Tags</Button
                >
            {/if}
        </Dialog.Footer>
    </Dialog.Content>
</Dialog.Root>
