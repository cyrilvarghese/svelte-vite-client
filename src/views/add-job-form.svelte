<script lang="ts">
    import { Input } from "$lib/components/ui/input";
    import { Label } from "$lib/components/ui/label";
    import { projects } from "../store/projectStore";
    import BadgeList from "../molecules/badge-list.svelte";
    import Button from "$lib/components/ui/button/button.svelte";
    import { Check } from "lucide-svelte";
    import Textarea from "$lib/components/ui/textarea/textarea.svelte";

    import LoaderCircle from "lucide-svelte/icons/loader-circle";
    import { createEventDispatcher } from "svelte";
    import { tagsList } from "../store/projectStore";
    import type { Tag } from "src/types";
    import { Toaster, toast } from "svelte-sonner";

    let projectId = 1;
    let name: string = "";
    let description: string = "";
    let files: FileList | null = null;
    let errorMessage: string = "";
    let docTags: Tag[];
    let loading = false;
    const dispatch = createEventDispatcher();
    tagsList.subscribe((tags) => {
        docTags = tags;
    });
    async function handleSubmit() {
        if (!files || files.length === 0) {
            errorMessage = "Please select at least one file to upload.";
            return;
        }
        try {
            loading = true;
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
            loading = false;
            dispatch("closeModal");
            toast.success("Job Added Successfully!");
        } catch (error: any) {
            errorMessage = `Failed to create job and files: ${error.message}`;
        }
    }
</script>

<form
    on:submit|preventDefault={handleSubmit}
    class="grid w=[340px] items-start gap-6"
>
    <fieldset class="grid gap-6 rounded-lg border p-4" disabled={loading}>
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
        <!-- <div class="grid gap-3">
            <Label for="description">Description</Label>
            <Textarea
                id="description"
                placeholder="Enter Description"
                bind:value={description}
            />
        </div> -->
    </fieldset>
    <fieldset class="grid gap-6 rounded-lg border p-4" disabled={loading}>
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
            <BadgeList tags={docTags} />
        </div>
    </fieldset>

    {#if loading}
        <Button class="w-[150px]" disabled>
            <LoaderCircle class="mr-2 h-4 w-4 animate-spin " />
            Please wait
        </Button>
    {:else}
        <Button type="submit" class="w-[150px]">
            <Check class="h-4 w-4 mr-2" />
            Create Job
        </Button>
    {/if}
</form>
