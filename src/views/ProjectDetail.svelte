<script lang="ts">
    import SecondaryHeader from "../molecules/SecondaryHeader.svelte";
    import { projects } from "../store/projectStore";
    import type { Project } from "../types";
    import { Progress } from "$lib/components/ui/progress";
    import { onMount } from "svelte";
    import Job from "../molecules/Job.svelte";
    import * as Tabs from "$lib/components/ui/tabs/index.js";
    import * as Card from "$lib/components/ui/card/index.js";
    import { Button } from "$lib/components/ui/button/index.js";
    import { Plus } from "lucide-svelte";

    export const id = 1; // Assume this could be dynamic
    let project: Project | null = null;
    let isLoading = false;
    let error: Error | null = null;
    let value = 13;
    onMount(() => {
        const interval = setInterval(() => {
            if (value >= 100) {
                clearInterval(interval); // Stop the interval once the value reaches 100
            } else {
                value += 10; // Increment the value by 10
            }
        }, 90); // Do this every 90ms

        return () => clearInterval(interval); // Cleanup the interval when the component is destroyed
    });
</script>

<main class="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
    {#await projects.fetchProjectById(+id)}
        <div class="flex flex-col items-start pl-0 p-12 h-full">
            <p class="mb-4">Loading Project</p>
            <Progress {value} max={100} class="h-1 w-[100%]" />
        </div>
    {:then project}
        <SecondaryHeader
            pageTitle={project?.name}
            pageDescription={project.description}
        />
        <Tabs.Root value="account" class="w-[400px]">
            <Tabs.List class="grid w-full grid-cols-2">
                <Tabs.Trigger value="account">Jobs</Tabs.Trigger>
                <Tabs.Trigger value="password">Files</Tabs.Trigger>
            </Tabs.List>
            <Tabs.Content value="account">
                <Card.Root>
                    <Card.Header>
                        <Card.Title>Jobs</Card.Title>
                        <Card.Description>
                            Listed below are jobs previously created, or create
                            a new one.
                        </Card.Description>
                        <Button class="w-[200px]">
                            <Plus />
                            Add New Job</Button
                        >
                    </Card.Header>
                    <Card.Content class="space-y-2">
                        <div
                            class="flex flex-1 items-start justify-start rounded-lg shadow-sm"
                        >
                            <div class=" flex flex-col gap-2">
                                {#each project.jobs as job (job.id)}
                                    <Job
                                        jobName={job.name}
                                        projectId={project.id}
                                        jobId={job.id}
                                    />
                                    <!-- More job details here -->
                                {/each}
                            </div>
                        </div>
                    </Card.Content>
                    <Card.Footer>Last updated on 25th April</Card.Footer>
                </Card.Root>
            </Tabs.Content>
        </Tabs.Root>
    {:catch error}
        <p>Error loading project: {error.message}</p>
    {/await}
</main>
