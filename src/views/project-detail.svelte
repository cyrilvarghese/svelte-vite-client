<script lang="ts">
    import SecondaryHeader from "../molecules/secondary-header.svelte";
    import { projects, selectedFileNames } from "../store/projectStore";
    import { tags } from "../store/tagStore";
    import type { Project } from "../types";
    import { Progress } from "$lib/components/ui/progress";
    import { onMount } from "svelte";
    import Job from "../molecules/job-card.svelte";
    import * as Tabs from "$lib/components/ui/tabs/index.js";
    import * as Card from "$lib/components/ui/card/index.js";
    import { FileUp, Search } from "lucide-svelte";
    import { ScrollArea } from "$lib/components/ui/scroll-area";
    import FilesList from "./file-list.svelte";
    import ChunkContainer from "./chunks-container.svelte";
    import AddJob from "./add-job-dialog.svelte";
    import { activeRoute } from "../store/projectStore";
    import { roles } from "../store/rolesStore";
    import { Button } from "$lib/components/ui/button";
    import { fade } from "svelte/transition";
    export let id = "";
    let project: Project | null = null;
    let isLoading = false;
    let chunkList: any[];
    let value = 13;
    let error: Error | any;

    onMount(() => {
       
        let location = window.location;
        activeRoute.set(location.href);

        fetchData();
        const interval = setInterval(() => {
            if (value >= 100) {
                clearInterval(interval); // Stop the interval once the value reaches 100
            } else {
                value += 10; // Increment the value by 10
            }
        }, 90); // Do this every 90ms

        return () => clearInterval(interval); // Cleanup the interval when the component is destroyed
    });

    async function fetchData() {
        isLoading = true;
        try {
            const newProject = await projects.fetchProjectById(+id);
            project = newProject; // Reassigning to trigger reactivity

            const tagsList = await tags.fetchTagsByProject(+id); // Reassigning to trigger reactivity
            const rolesList = await roles.fetchRoles(); // Reassigning to trigger reactivity
        } catch (e) {
            error = e;
        } finally {
            isLoading = false;
        }
    }
    async function getChunks(fileNames: string[]) {
        isLoading = true;
        try {
            chunkList = await projects.fetchChunksByFilenames(fileNames);
 
            console.log("chunk data refreshed");
        } catch (e) {
            error = e;
        } finally {
            isLoading = false;
        }
    }
    let handleRefresh = async () => {
        isLoading = true;
        try {
            project = await projects.fetchProjectById(+id);

            console.log("Project data refreshed");
        } catch (e) {
            error = e;
        } finally {
            isLoading = false;
        }
    };

    $: console.log(project);
</script>

<main class="flex flex-row">
     
    <div class="flex flex-1 flex-col gap-4 p-4 lg:p-6">
        {#if isLoading}
            <div class="flex flex-col items-start pl-0 p-12 h-full">
                <p class="mb-4 animate-pulse">Loading Project</p>
                <Progress {value} max={100} class="h-1 w-[100%]" />
            </div>
        {:else}
            <SecondaryHeader
                pageTitle={project?.name}
                pageDescription={project?.description}
                showBreadCrumb
            />
            <Tabs.Root value="jobs" class="w-[400px] ">
                <Tabs.List class="grid w-full grid-cols-2">
                    <Tabs.Trigger value="jobs">Jobs</Tabs.Trigger>
                    <Tabs.Trigger value="files">Files</Tabs.Trigger>
                </Tabs.List>
                <Tabs.Content value="jobs">
                    <Card.Root>
                        <Card.Header class="items-start">
                            <Card.Title>
                                <div class="flex flex-row items-end">
                                    Jobs
                                    <Search
                                        class="ml-2 h-4 w-4 text-muted-foreground"
                                    />
                                </div>
                            </Card.Title>
                            <Card.Description>
                                <div class="flex flex-row justify-between">
                                    List of tagging jobs for the project
                                    <AddJob
                                        on:openChange={(e) => {
                                            e.detail.openModal
                                                ? ""
                                                : handleRefresh();
                                        }}
                                    />
                                </div>
                            </Card.Description>
                        </Card.Header>
                        <Card.Content class="space-y-2 pb-4">
                            <div
                                class="flex flex-1 items-start justify-start rounded-lg shadow-sm"
                            >
                                <div
                                    class=" flex flex-col"
                                    transition:fade={{
                                        delay: 250,
                                        duration: 300,
                                    }}
                                >
                                    <ScrollArea class=" h-[calc(100vh-450px)]">
                                        {#if project?.jobs}
                                            {#each project?.jobs as job (job.id)}
                                                <Job
                                                    jobName={job.name}
                                                    projectId={project?.id}
                                                    jobId={job.id}
                                                    createdAt={job.created_at}
                                                />

                                                <!-- More job details here -->
                                            {/each}
                                        {/if}
                                    </ScrollArea>
                                </div>
                            </div>
                        </Card.Content>
                        <Card.Footer>Last updated on 25th April</Card.Footer>
                    </Card.Root>
                </Tabs.Content>
                <Tabs.Content value="files">
                    <Card.Root>
                        {#await projects.fetchProjectFiles(+id)}
                            <!-- promise is pending -->
                            <p class="animate-bounce">
                                Loading Project Files..
                            </p>
                        {:then files}
                            <!-- promise was fulfilled -->
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
                                <ScrollArea class=" h-[calc(100vh-420px)]">
                                    <div
                                        class="flex items-start justify-start rounded-lg shadow-sm"
                                    >
                                        <div
                                            class=" flex flex-col items-start"
                                            transition:fade={{
                                                delay: 250,
                                                duration: 300,
                                            }}
                                        >
                                            <FilesList {files} />
                                        </div>
                                    </div>
                                </ScrollArea>
                            </Card.Content>
                            <Card.Footer>{files.length} Files</Card.Footer>
                        {/await}
                    </Card.Root>
                </Tabs.Content>
            </Tabs.Root>
        {/if}
    </div>
    <!-- <Separator class="ml-6" orientation="vertical" /> -->
    <ChunkContainer projectId={+id} />
</main>
