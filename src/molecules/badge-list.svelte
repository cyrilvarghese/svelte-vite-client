<script lang="ts">
    import { Badge } from "$lib/components/ui/badge";
    import { AlertCircle } from "lucide-svelte";
    import type { Tag } from "src/types";
    import * as Tooltip from "$lib/components/ui/tooltip";
    let errorClass = "";
    // Function to return style string based on tag color
    function badgeStyle(color: string, score: string) {
        if (+score < -10.0) {
            errorClass = "bg-red-700 text-slate-100";
            return;
        }
        return `background-color: ${color}; color: ${getContrast(color)};`;
    }

    // Function to determine text color based on background for better readability
    function getContrast(hexColor: string) {
        // Remove hash if present
        const color = hexColor.replace("#", "");
        const r = parseInt(color.substr(0, 2), 16);
        const g = parseInt(color.substr(2, 2), 16);
        const b = parseInt(color.substr(4, 2), 16);
        const brightness = (r * 299 + g * 587 + b * 114) / 1000;
        return brightness > 135 ? "#000" : "#FFF"; // Dark text for light backgrounds and vice versa
    }
    export let tags: Tag[];
</script>

<div class="flex flex-row justify-start flex-wrap">
    {#each tags as tag (tag.id)}
        <Tooltip.Root>
            <Tooltip.Trigger>
                <Badge
                    class="mr-2 mt-2 {errorClass}"
                    style={badgeStyle(tag.color, tag.score)}
                >
                    {#if +tag.score < -10.0}
                        <AlertCircle class="h-4 w-4 mr-2" />
                    {/if}
                    {tag.name}</Badge
                >
            </Tooltip.Trigger>
            <Tooltip.Content side="bottom">
                {#if tag.score !== ""}
                    <p>Relevancy Score of {tag.score}</p>
                {:else}
                    <p>{tag.description}</p>
                {/if}
            </Tooltip.Content>
        </Tooltip.Root>
    {/each}
</div>
