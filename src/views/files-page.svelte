<script>
    import { onMount } from "svelte";
    import { activeRoute } from "../store/projectStore";

    onMount(() => {
        let location = window.location;
        activeRoute.set(location.href);
    });
</script>

<h1>FilesLists</h1>
