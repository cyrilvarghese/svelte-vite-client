<script>
    import { Button } from "$lib/components/ui/button";
    import { Check } from "lucide-svelte";
    import LoaderCircle from "lucide-svelte/icons/loader-circle";

    export let isLoading = false;
    export let buttonText = "Submit";
</script>

<div>
    {#if isLoading}
        <Button class="w-[150px]" disabled>
            <LoaderCircle class="mr-2 h-4 w-4 animate-spin " />
            Please wait
        </Button>
    {:else}
        <Button type="submit" class="w-[150px]">
            <Check class="h-4 w-4 mr-2" />
            {buttonText}
        </Button>
    {/if}
</div>
