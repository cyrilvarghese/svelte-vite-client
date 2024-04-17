<script lang="ts">
    import Paperclip from "lucide-svelte/icons/paperclip";
    import Mic from "lucide-svelte/icons/mic";
    import CornerDownLeft from "lucide-svelte/icons/corner-down-left";
    import { Badge } from "$lib/components/ui/badge/index.js";
    import { Button } from "$lib/components/ui/button/index.js";
    import * as Tooltip from "$lib/components/ui/tooltip/index.js";
    import { Textarea } from "$lib/components/ui/textarea/index.js";
    import { Label } from "$lib/components/ui/label/index.js";
    import ChunkList from "../molecules/chunk-list.svelte";
    import * as Tabs from "$lib/components/ui/tabs/index.js";
    import { onMount } from "svelte";
    import { projects, selectedFileNames } from "../store/projectStore";

    let chunks: any[];
    export let projectId: number;
    let isLoading = false;
    let error: Error | any;

    selectedFileNames.subscribe((filenames) => {
        
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
                <h2
                    class="text-lg font-semibold text-muted-foreground md:text-xl pb-4"
                >
                    Relevant Chunks
                </h2>
                <Tabs.Root value="all">
                    <Tabs.List class="grid grid-cols-3 w-[300]">
                        <Tabs.Trigger value="all">All Chunks</Tabs.Trigger>
                        <Tabs.Trigger value="review">Under Review</Tabs.Trigger>
                        <Tabs.Trigger value="approved">Approved</Tabs.Trigger>
                    </Tabs.List>
                    <Tabs.Content value="all">
                        {#if chunks.length > 0}
                            <ChunkList {chunks} variant="all" />
                        {:else}
                            <div class="flex-1 flex flex-col items-center justify-center">
                                <p>Select a file to begin</p>
                            </div>
                        {/if}
                    </Tabs.Content>
                    <Tabs.Content value="review">
                        <ChunkList {chunks} variant="review" />
                    </Tabs.Content>
                    <Tabs.Content value="approved">
                        <ChunkList {chunks} variant="approved" />
                    </Tabs.Content>
                </Tabs.Root>
                <div class="flex-1" />
                <form
                    class="relative overflow-hidden rounded-lg border bg-background focus-within:ring-1 focus-within:ring-ring"
                    data-x-chunk-name="dashboard-03-chunk-1"
                    data-x-chunk-description="A form for sending a message to an AI chatbot. The form has a textarea and buttons to upload files and record audio."
                >
                    <Label for="message" class="sr-only">Message</Label>
                    <Textarea
                        id="message"
                        placeholder="Type your message here..."
                        class="min-h-12 resize-none border-0 p-3 shadow-none focus-visible:ring-0"
                    />
                    <div class="flex items-center p-3 pt-0">
                        <Tooltip.Root>
                            <Tooltip.Trigger asChild let:builder>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    builders={[builder]}
                                >
                                    <Paperclip class="size-4" />
                                    <span class="sr-only">Attach file</span>
                                </Button>
                            </Tooltip.Trigger>
                            <Tooltip.Content side="top">
                                Attach File
                            </Tooltip.Content>
                        </Tooltip.Root>
                        <Tooltip.Root>
                            <Tooltip.Trigger asChild let:builder>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    builders={[builder]}
                                >
                                    <Mic class="size-4" />
                                    <span class="sr-only">Use Microphone</span>
                                </Button>
                            </Tooltip.Trigger>
                            <Tooltip.Content side="top"
                                >Use Microphone</Tooltip.Content
                            >
                        </Tooltip.Root>
                        <Button type="submit" size="sm" class="ml-auto gap-1.5">
                            Send Message
                            <CornerDownLeft class="size-3.5" />
                        </Button>
                    </div>
                </form>
            </div>
        </main>
    </div>
</div>
