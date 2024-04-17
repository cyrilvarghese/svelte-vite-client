<script>
    import { onMount } from "svelte";
    import { activeRoute } from "../store/projectStore";
    import EmptyState from "../molecules/empty-state.svelte";

    onMount(() => {
        let location = window.location;
        activeRoute.set(location.href);
    });
</script>

<main class="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
    <div class="flex items-center">
        <h1 class="text-lg font-semibold md:text-2xl">Test Module</h1>
    </div>
    <div class="flex flex-1 items-start justify-start rounded-lg shadow-sm">
        <EmptyState
            title="You have no tests"
            description=" Placeholder Text"
            addButtonText="Add Job"
            
        />
    </div>
</main>
