<script lang="ts">
    import type { File } from "../types";
    import FileItem from "../molecules/FileItem.svelte";
    export let files:File[]=[]
</script>

{#each files as file (file.id)}
    <FileItem  variant="simple" {file} />
    <!-- More job details here -->
{/each}
