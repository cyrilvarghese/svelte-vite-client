<script lang="ts">
    import { Button } from "$lib/components/ui/button";

    export let showAddAction = false;
    export let title = "You have no items";
    export let description = "Add an item to get started.";
    export let addButtonText = "Add";
</script>

<div
    data-x-chunk-name="dashboard-02-chunk-1" 
    data-x-chunk-description="An empty state showing no products with a heading, description and a call to action to add a product."
    class="flex flex-1 items-start  justify-center rounded-lg border border-dashed shadow-sm h-full w-full"
>
    <div class="flex flex-col items-center gap-1 text-center mt-[200px]">
        <h3 class="text-2xl font-bold tracking-tight capitalize">{title}</h3>
        <p class="text-sm text-muted-foreground">
            {description}
        </p>
        <Button class="mt-4 {showAddAction ? '' : 'hidden'}"
            >{addButtonText}</Button
        >
    </div>
</div>
