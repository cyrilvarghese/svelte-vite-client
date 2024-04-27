<script lang="ts">
    import * as Breadcrumb from "$lib/components/ui/breadcrumb/index.js";
    import * as DropdownMenu from "$lib/components/ui/dropdown-menu/index.js";
    export let pageTitle: string = "";
    export let pageDescription: string = "";
    export let showBreadCrumb = false;
</script>

<div class={!showBreadCrumb ? "hidden" : ""}>
    <Breadcrumb.Root>
        <Breadcrumb.List>
            <Breadcrumb.Item>
                <Breadcrumb.Link href="/projects" class="hover:underline"
                    >Projects</Breadcrumb.Link
                >
            </Breadcrumb.Item>
            <Breadcrumb.Separator />
        </Breadcrumb.List>
    </Breadcrumb.Root>
</div>
<div class="flex flex-col items-start">
    <h1 class="text-lg font-semibold md:text-2xl">{pageTitle}</h1>
    <p class="text-sm text-muted-foreground">{pageDescription}</p>
</div>
