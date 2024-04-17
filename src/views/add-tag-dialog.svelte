<script lang="ts">
    import { Button, buttonVariants } from "$lib/components/ui/button/index.js";
    import * as Dialog from "$lib/components/ui/dialog/index.js";
    import { Plus } from "lucide-svelte";
    import AddTagForm from "./add-tag-form.svelte";
    import { createEventDispatcher } from "svelte";
    import { onMount } from "svelte";
    const dispatch = createEventDispatcher();
    let openModal: boolean = false;
    function handleOpenChange(isOpen: boolean) {
        openModal = isOpen; // Ensuring openModal is updated with dialog's state
    }

    function closeModal() {
        openModal = false;
        dispatch("openChange", { openModal });
    }
</script>

<Dialog.Root open={openModal} onOpenChange={handleOpenChange}>
    <Dialog.Trigger>
        <Button variant="outline" class="w-[150px]">
            <Plus class="mr-2" />
            Add Tag</Button
        ></Dialog.Trigger
    >

    <Dialog.Content class="sm:max-w-[425px]">
        <Dialog.Header>
            <Dialog.Title>Add New Tag</Dialog.Title>
            <Dialog.Description>Create a new tag</Dialog.Description>
        </Dialog.Header>

        <AddTagForm on:closeModal={closeModal} />
    </Dialog.Content>
</Dialog.Root>
