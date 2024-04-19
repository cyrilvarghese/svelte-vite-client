<script lang="ts">
    import { ChevronsUpDown, File, FileText } from "lucide-svelte";
    import * as Collapsible from "$lib/components/ui/collapsible/index.js";
    import { Button } from "$lib/components/ui/button/index.js";
    import { projects } from "../store/projectStore"; // importing the store from projectStore.js
    import type { Job, JobDetail } from "src/types";
    import FileItem from "./file-item.svelte";

    export let jobId = 1;
    export let projectId = 1;
    export let jobName = "";
    export let isChecked = false;
    export let createdAt = "";
    let jobDetail: JobDetail | null = null;
    let loading = false;
    let error: Error | null = null;
    async function getJobDetails(isOpen: boolean) {
        if (isOpen) {
            loading = true;
            isChecked = true;
            error = null;
            try {
                jobDetail = await projects.fetchJobDetails(projectId, jobId);
            } catch (err) {
                error = err as Error;
                jobDetail = null;
            } finally {
                loading = false;
            }
        } else {
            isChecked = false;
        }
    }
</script>

<Collapsible.Root class="  space-y-2 pb-2" onOpenChange={getJobDetails}>
    <div class="flex items-center justify-between space-x-4 mb-2">
        <div
            class="rounded-md flex flex-row border border-b-2 px-4 py-3 font-mono text-sm {isChecked
                ? 'bg-muted'
                : ''}"
        >
            <h4
                class="text-sm font-semibold w-[280px] flex flex-col justify-center"
            >
                {jobName}
            </h4>
            <Collapsible.Trigger asChild let:builder>
                <Button builders={[builder]} variant="ghost" class="w-9 p-0">
                    <ChevronsUpDown class="h-4 w-4" />
                    <span class="sr-only">Toggle</span>
                </Button>
            </Collapsible.Trigger>
        </div>
    </div>

    <Collapsible.Content class="space-y-2 pb-3">
        {#if jobDetail}
            {#each jobDetail.files as file}
                <FileItem variant="simple" {file} />
            {/each}
        {:else if loading}
            <p class="pl-4 animate-pulse">Loading details...</p>
        {:else if error}
            <p class="pl-4">Error loading job details: {error.message}</p>
        {:else}
            <p class="pl-4">No job details available.</p>
        {/if}
    </Collapsible.Content>
</Collapsible.Root>
