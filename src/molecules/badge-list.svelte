<script lang="ts">
    import { Badge } from "$lib/components/ui/badge";
    import type { Tag } from "src/types";
    // Function to return style string based on tag color
    function badgeStyle(color: string) {
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
        return brightness > 125 ? "#000" : "#FFF"; // Dark text for light backgrounds and vice versa
    }
    export let tags: Tag[];
</script>

<div class="flex flex-row justify-start flex-wrap">
    {#each tags as tag (tag.id)}
        <Badge class="mr-2 mt-2" style={badgeStyle(tag.color)}>{tag.name}</Badge>
    {/each}
</div>
