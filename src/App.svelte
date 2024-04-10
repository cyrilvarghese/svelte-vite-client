<script lang="ts">
  import { Router, Route } from "svelte-routing";
  import Index from "./layouts/index.svelte";
  export let url = "";
</script>

<main>
  <div>
    <Router {url}>
      <!-- admin layout -->
      <Route path="/*" component={Index} />
    </Router>
  </div>
</main>

<style>
  .logo {
    height: 6em;
    padding: 1.5em;
    will-change: filter;
    transition: filter 300ms;
  }
  .logo:hover {
    filter: drop-shadow(0 0 2em #646cffaa);
  }
  .logo.svelte:hover {
    filter: drop-shadow(0 0 2em #ff3e00aa);
  }
  .read-the-docs {
    color: #888;
  }
</style>
