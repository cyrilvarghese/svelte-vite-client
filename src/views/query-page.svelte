<script lang="ts">
    import { projects } from "../store/projectStore";
    import { Progress } from "$lib/components/ui/progress";
    import { onMount } from "svelte";
    import * as Card from "$lib/components/ui/card/index.js";
    import { Search } from "lucide-svelte";
    import { ScrollArea } from "$lib/components/ui/scroll-area";
    import FilesList from "./file-list.svelte";
    import ChunkContainer from "./chunks-container.svelte";
    import { activeRoute } from "../store/projectStore";
    import ProjectCombobox from "../molecules/project-combobox.svelte";
    export let id = "";
    let isLoading = false;
    let value = 13;
    let files: any = [];
    onMount(() => {
        let location = window.location;
        activeRoute.set(location.href);
    });

    async function getFiles(selectedProjectId: any) {
        files = await projects.fetchProjectFiles(+selectedProjectId);
        debugger;
    }
</script>

<main class="flex flex-row">
    <div class="flex flex-1 flex-col gap-4 p-4 lg:p-6 w-[40%]">
        {#if isLoading}
            <div class="flex flex-col items-start pl-0 p-12 h-full">
                <p class="mb-4 animate-pulse">Loading Project</p>
                <Progress {value} max={100} class="h-1 w-[100%]" />
            </div>
        {:else}
            <ProjectCombobox
                on:projectSelected={(event) => {
                    let selectedProjectId = event.detail.projectId;
                    getFiles(selectedProjectId);
                }}
            />

            <Card.Root>
                <Card.Header>
                    <Card.Title>
                        <div class="flex flex-row items-end">
                            Files
                            <Search
                                class="ml-2 h-4 w-4 text-muted-foreground"
                            />
                        </div>
                    </Card.Title>
                    <Card.Description>
                        List of files for the project
                    </Card.Description>
                </Card.Header>
                <Card.Content class="space-y-2 pb-2  ">
                    <ScrollArea class=" h-[calc(100vh-356px)]">
                        <div
                            class="flex items-start justify-start rounded-lg shadow-sm"
                        >
                            <div class=" flex flex-col items-start">
                                <FilesList {files} />
                            </div>
                        </div>
                    </ScrollArea>
                </Card.Content>
                <Card.Footer>{files.length} Files</Card.Footer>
            </Card.Root>
        {/if}
    </div>
    <!-- <Separator class="ml-6" orientation="vertical" /> -->
    <div class="w-[60%]">
        <ChunkContainer projectId={+id} />
    </div>
</main>
