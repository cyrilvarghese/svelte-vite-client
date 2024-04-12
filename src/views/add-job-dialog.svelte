<script lang="ts">
    import { Button, buttonVariants } from "$lib/components/ui/button/index.js";
    import * as Dialog from "$lib/components/ui/dialog/index.js";
    import { Plus } from "lucide-svelte";
    import AddJobForm from "./add-job-form.svelte";
    import { createEventDispatcher } from "svelte";
    const dispatch = createEventDispatcher();

    function handleOpenChange(isOpen: boolean) {
        dispatch("openChange", { isOpen });
        // Any additional logic when the dialog opens/closes can be placed here
    }
</script>

<Dialog.Root onOpenChange={handleOpenChange}>
    <Dialog.Trigger>
        <Button class="w-[150px]">
            <Plus class="mr-2" />
            Add Job</Button
        ></Dialog.Trigger
    >
    <Dialog.Content class="sm:max-w-[425px]">
        <Dialog.Header>
            <Dialog.Title>Add New Job</Dialog.Title>
            <Dialog.Description>Create a new tagging job</Dialog.Description>
        </Dialog.Header>

        <AddJobForm />
    </Dialog.Content>
</Dialog.Root>
