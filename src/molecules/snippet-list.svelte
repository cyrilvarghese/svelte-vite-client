<script lang="ts">
    import { cn } from "$lib/utils.js";
    import ChunkDetails from "./snippet-details-dialog.svelte";
    import { snippetStore } from "../store/vectorRetrieverStore";
    import { fade, fly } from "svelte/transition";
    let snippets: any[] = [];
    snippetStore.subscribe((relevantSnippets) => {
        debugger;
        snippets = [...relevantSnippets];
    });
</script>

<main transition:fly={{ y: 200, duration: 1000 }}>
    <div class="flex flex-col gap-6 p-4">
        {@debug snippets}
        {#each snippets as data, index (index)}
            <div class="flex flex-row items-center">
                <ChunkDetails documentText={data.page_content}>
                    <button
                        class={cn(
                            "  flex flex-col  items-start gap-2 shadow-sm  rounded-lg  p-4 text-left text-sm transition-all",
                        )}
                    >
                        <div
                            class="line-clamp-2 text-sm m-4 ml-0 text-muted-foreground"
                        >
                            {data.page_content}
                        </div>
                    </button>
                </ChunkDetails>
            </div>
        {/each}
    </div>
</main>
