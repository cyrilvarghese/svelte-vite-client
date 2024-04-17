<script>
    import { onMount } from "svelte";
    import { activeRoute } from "../store/projectStore";
    import EmptyState from "../molecules/empty-state.svelte";
    import { Button } from "$lib/components/ui/button";
    import * as Card from "$lib/components/ui/card";
    import { Checkbox } from "$lib/components/ui/checkbox";

    import { Input } from "$lib/components/ui/input";
    onMount(() => {
        let location = window.location;
        activeRoute.set(location.href);
    });
</script>

<main class="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
    <div class="flex items-center">
        <h1 class="text-lg font-semibold md:text-2xl">Settings</h1>
    </div>
    <div
        class="flex flex-1 items-start justify-start flex-col gap-4 rounded-lg shadow-sm"
    >
        <Card.Root
            data-x-chunk-name="dashboard-04-chunk-1"
            data-x-chunk-description="A form to update the store name."
            class="w-[500px]"
        >
            <Card.Header>
                <Card.Title>User Name</Card.Title>
                <Card.Description>Used to login to the app</Card.Description>
            </Card.Header>
            <Card.Content>
                <form>
                    <Input placeholder="User Name" />
                </form>
            </Card.Content>
            <Card.Footer class="border-t px-6 py-4">
                <Button>Save</Button>
            </Card.Footer>
        </Card.Root>
        <Card.Root class="w-[500px]"
            data-x-chunk-name="dashboard-04-chunk-2"
            data-x-chunk-description="A form to update the plugins directory with a checkbox to allow administrators to change the directory."
        >
            <Card.Header>
                <Card.Title>Plugins Directory</Card.Title>
                <Card.Description>
                    The directory within your project, in which your plugins are
                    located.
                </Card.Description>
            </Card.Header>
            <Card.Content>
                <form class="flex flex-col gap-4">
                    <Input
                        placeholder="Project Name"
                        value="/content/plugins"
                    />
                    <div class="flex items-center space-x-2">
                        <Checkbox id="include" checked={true} />
                        <label
                            for="include"
                            class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                            Allow administrators to change the directory.
                        </label>
                    </div>
                </form>
            </Card.Content>
            <Card.Footer class="border-t px-6 py-4">
                <Button>Save</Button>
            </Card.Footer>
        </Card.Root>
    </div>
</main>
