<script lang="ts">
    import Paperclip from "lucide-svelte/icons/paperclip";
    import Mic from "lucide-svelte/icons/mic";
    import CornerDownLeft from "lucide-svelte/icons/corner-down-left";
    import * as Tooltip from "$lib/components/ui/tooltip/index.js";
    import { Textarea } from "$lib/components/ui/textarea/index.js";
    import { Label } from "$lib/components/ui/label/index.js";
    import SnippetList from "../molecules/snippet-list.svelte";
    import { Button } from "$lib/components/ui/button";
    import { ScrollArea } from "$lib/components/ui/scroll-area";
    import {
        snippetStore,
        type QueryRequest,
        type Snippet,
    } from "../store/vectorRetrieverStore";
    import { Input } from "$lib/components/ui/input";
    import { LoaderCircle } from "lucide-svelte";
    import { Skeleton } from "$lib/components/ui/skeleton";
    import { fade } from "svelte/transition";

    let isLoading: boolean = false;
    let question: string = "";
    let numOfresults: number = 5;
    let snippets: any[] | undefined;
    async function handleGetSnippets(event: any) {
        isLoading = true;
        const request: QueryRequest = {
            question: question,
            results: numOfresults,
        };
        let response = await snippetStore.getRelevantSnippets(request);
        isLoading = false;
    }
</script>

<main>
    <p class=" p-6 pb-0 text-xl text-muted-foreground">Relevant Snippets</p>
    <ScrollArea class=" h-[calc(100vh-300px)] m-4 rounded-lg  bg-muted">
        {#if isLoading}
            <div
                class="flex flex-col items-center justify-center pt-[100px] gap-6"
            >
                <p class=" text-xl text-muted-foreground animate-pulse">
                    Loading Snippets...
                </p>
            </div>
        {:else}
            <SnippetList />
        {/if}
    </ScrollArea>

    <!-- query text area -->
    <div class="p-4 flex flex-col gap-6">
        <!-- <div class="flex flex-col gap-3 w-[120px]">
            <Label for="price-1">Number of results</Label>
            <Input
                id="frmPg"
                type="number"
                bind:value={numOfresults}
                disabled={isLoading}
            />
        </div> -->

        <form
            class="relative overflow-hidden rounded-lg border bg-background focus-within:ring-1 focus-within:ring-ring"
        >
            <Label for="message" class="sr-only">Message</Label>
            <Textarea
                disabled={isLoading}
                id="message"
                bind:value={question}
                placeholder="Type your question here..."
                class="min-h-12 resize-none border-0 p-3 shadow-none focus-visible:ring-0"
            />
            <div class="flex items-center p-3 pt-0">
                <Tooltip.Root>
                    <Tooltip.Trigger asChild let:builder>
                        <Button
                            disabled={isLoading}
                            variant="ghost"
                            size="icon"
                            builders={[builder]}
                        >
                            <Paperclip class="size-4" />
                            <span class="sr-only">Attach file</span>
                        </Button>
                    </Tooltip.Trigger>
                    <Tooltip.Content side="top">Attach File</Tooltip.Content>
                </Tooltip.Root>
                <Tooltip.Root>
                    <Tooltip.Trigger asChild let:builder>
                        <Button
                            disabled={isLoading}
                            variant="ghost"
                            size="icon"
                            builders={[builder]}
                        >
                            <Mic class="size-4" />
                            <span class="sr-only">Use Microphone</span>
                        </Button>
                    </Tooltip.Trigger>
                    <Tooltip.Content side="top">Use Microphone</Tooltip.Content>
                </Tooltip.Root>

                {#if isLoading}
                    <Button size="sm" class="ml-auto gap-1.5 " disabled>
                        <LoaderCircle class="mr-2 h-4 w-4 animate-spin " />
                        Getting Snippets...
                    </Button>
                {:else}
                    <Button
                        on:click={handleGetSnippets}
                        size="sm"
                        class="ml-auto gap-1.5"
                    >
                        Get Relevant Snippets
                        <CornerDownLeft class="size-3.5" />
                    </Button>
                {/if}
            </div>
        </form>
    </div>
</main>
