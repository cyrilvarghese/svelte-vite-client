<script lang="ts">
    import { ChevronsUpDown } from "lucide-svelte";
    import * as Collapsible from "$lib/components/ui/collapsible/index.js";
    import { Button } from "$lib/components/ui/button/index.js";
    import { projects } from "../store/projectStore"; // importing the store from projectStore.js
    import type { Job, JobDetail } from "src/types";

    export let jobId = 1;
    export let projectId = 1;
    export let jobName = "";
    let jobDetail: JobDetail | null = null;
    let loading = false;
    let error: Error | null = null;
    async function getJobDetails() {
        debugger;

        loading = true;
        error = null;
        try {
            jobDetail = await projects.fetchJobDetails(projectId, jobId);
        } catch (err) {
            error = err as Error;
            jobDetail = null;
        } finally {
            loading = false;
        }
    }
</script>

<Collapsible.Root class="w-[400px] space-y-2">
    <div class="flex items-center justify-between space-x-4">
        <div
            class="rounded-md flex flex-row border px-4 py-3 font-mono text-sm"
        >
            <h4 class="text-sm font-semibold w-[250px]">{jobName}</h4>
            <Collapsible.Trigger asChild let:builder>
                <Button
                    on:click={getJobDetails}
                    builders={[builder]}
                    variant="ghost"
                    size="sm"
                    class="w-9 p-0"
                >
                    <ChevronsUpDown class="h-4 w-4" />
                    <span class="sr-only">Toggle</span>
                </Button>
            </Collapsible.Trigger>
        </div>
    </div>

    <Collapsible.Content class="space-y-2">
        {#if jobDetail}
            {#each jobDetail.files as file}
                <div class="rounded-md border px-4 py-3 font-mono text-sm">
                    {file.name}
                </div>
            {/each}
        {:else if loading}
            <p>Loading details...</p>
        {:else if error}
            <p>Error loading job details: {error.message}</p>
        {:else}
            <p>No job details available.</p>
        {/if}
    </Collapsible.Content>
</Collapsible.Root>
