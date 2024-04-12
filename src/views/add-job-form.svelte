<script lang="ts">
    import { Input } from "$lib/components/ui/input";
    import { Label } from "$lib/components/ui/label";
    import { projects } from "../store/projectStore";
    import BadgeList from "../molecules/badge-list.svelte";
    import Button from "$lib/components/ui/button/button.svelte";
    import { Check } from "lucide-svelte";
    import Textarea from "$lib/components/ui/textarea/textarea.svelte";

    let projectId = 1;
    let name: string = "";
    let description: string = "";
    let files: FileList | null = null;
    let errorMessage: string = "";
    async function handleSubmit() {
        if (!files || files.length === 0) {
            errorMessage = "Please select at least one file to upload.";
            return;
        }
        try {
            await projects.createJobWithFiles(
                projectId,
                name,
                description,
                files,
            );
             
            // Reset form or navigate away
            name = "";
            description = "";
            files = null;
        } catch (error: any) {
            errorMessage = `Failed to create job and files: ${error.message}`;
        }
    }
</script>

<form
    on:submit|preventDefault={handleSubmit}
    class="grid w=[340px] items-start gap-6"
>
    <fieldset class="grid gap-6 rounded-lg border p-4">
        <legend class="-ml-1 px-1 text-sm font-medium"> Job Details </legend>
        <div class="grid gap-3">
            <Label for="name">Name</Label>
            <Input
                id="name"
                type="text"
                placeholder="Enter Job Name"
                bind:value={name}
                required
            />
        </div>
        <div class="grid gap-3">
            <Label for="description">Description</Label>
            <Textarea
                id="description"
                placeholder="Enter Description"
                bind:value={description}
            />
        </div>
    </fieldset>
    <fieldset class="grid gap-6 rounded-lg border p-4">
        <legend class="-ml-1 px-1 text-sm font-medium"> Tagging Details</legend>
        <div class="grid gap-3">
            <Label for="files">Files to be tagged</Label>

            <input
                type="file"
                class="flex h-10 rounded-md border border-input px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 bg-slate-400 hover:bg-slate-500 cursor-pointer w-[250px] text-slate-200"
                id="files"
                multiple
                bind:files
            />
        </div>
        <div class="grid gap-3">
            <Label for="files">Tags in the project</Label>
            {#await projects.fetchTagsByProject(+projectId)}
                <p class="mb-4 animate-pulse">Loading Tags</p>
                <!-- projects.fetchTagsByProject is pending -->
            {:then tags}
                <BadgeList {tags} />
                <!-- projects.fetchTagsByProject was fulfilled -->
            {:catch error}
                <p class="mb-4 animate-pulse">Error fetching API : {error}</p>
                <!-- projects.fetchTagsByProject was rejected -->
            {/await}
        </div>
    </fieldset>
    <Button type="submit" class="w-[150px]">
        <Check class="h-4 w-4 mr-2" />
        Create Job
    </Button>
</form>
