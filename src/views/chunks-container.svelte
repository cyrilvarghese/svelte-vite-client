<script lang="ts">
    import ChunkList from "../molecules/chunk-list.svelte";
    import * as Tabs from "$lib/components/ui/tabs/index.js";
    import { onMount } from "svelte";
    import { projects, selectedFileNames } from "../store/projectStore";
    import EmptyState from "../molecules/empty-state.svelte";
    import AddTagDialog from "./add-tag-dialog.svelte";

    let chunks: any[];
    export let projectId: number;
    let isLoading = false;
    let selectedFiles: string[];
    let error: Error | any;

    selectedFileNames.subscribe((filenames) => {
 
        selectedFiles = filenames;
        if (filenames.length > 0) {
            getChunks(filenames);
        } else {
            chunks = [];
        }
    });
    async function getChunks(fileNames: string[]) {
        isLoading = true;
        try {
            chunks = await projects.fetchChunksByFilenames(fileNames);

            console.log("chunk data refreshed");
        } catch (e) {
            error = e;
        } finally {
            isLoading = false;
        }
    }
   


    onMount(() => {
        selectedFileNames.set([]);
    });
</script>

<div class="grid h-[calc(100vh-60px)] w-full">
    <div class="flex flex-col">
        <main class="flex flex-1 flex-col gap-4 p-4 pt-0">
            <div
                class="relative flex h-full min-h-[50vh] flex-col my-4 rounded-xl bg-muted/50 p-4 lg:col-span-2"
            >
                {#if selectedFiles.length !== 0}
                    {#if isLoading}
                        <h2
                            class="text-lg font-semibold text-muted-foreground md:text-xl pb-4"
                        >
                            Loading Chunks
                        </h2>
                    {:else}
                        <div class="flex flex-row w-full justify-between">
                            <h2
                                class="text-lg font-semibold text-muted-foreground md:text-xl pb-4"
                            >
                                Relevant Chunks
                            </h2>
                            <AddTagDialog projectId={projectId} />
                        </div>
                    {/if}

                    <Tabs.Root value="all" class="mt-4">
                        <Tabs.List class="grid grid-cols-3 w-[300]">
                            <Tabs.Trigger value="all">All Chunks</Tabs.Trigger>
                            <Tabs.Trigger value="review"
                                >Under Review</Tabs.Trigger
                            >
                            <Tabs.Trigger value="approved"
                                >Approved</Tabs.Trigger
                            >
                        </Tabs.List>
                        <Tabs.Content value="all">
                            <ChunkList fileNames={selectedFiles} {chunks} variant="all" />
                        </Tabs.Content>
                        <Tabs.Content value="review">
                            <ChunkList  fileNames={selectedFiles} {chunks} variant="review" />
                        </Tabs.Content>
                        <Tabs.Content value="approved">
                            <ChunkList  fileNames={selectedFiles} {chunks} variant="approved" />
                        </Tabs.Content>
                    </Tabs.Root>
                {:else if selectedFiles.length !== 0 && chunks.length === 0}
                    <div
                        class="flex-1 flex flex-col items-center justify-center"
                    ></div>
                {:else}
                    <div
                        class="flex-1 flex flex-col items-center justify-center"
                    >
                        <EmptyState
                            title={isLoading
                                ? "Loading Chunks"
                                : "No File Selected"}
                            description={isLoading
                                ? "Please wait..."
                                : "Select a job and file to begin seeing"}
                        />
                    </div>
                {/if}
            </div>
        </main>
    </div>
</div>
