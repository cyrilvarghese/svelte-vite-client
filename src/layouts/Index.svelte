<script lang="ts">
    import { Route, Router } from "svelte-routing";
    import SettingsPage from "../views/Settings.svelte";
    import Header from "../molecules/Header.svelte";
    import Sidebar from "../molecules/Sidebar.svelte";
    import FileList from "../views/FilesView.svelte";
    import Query from "../views/Query.svelte";
    import ProjectDetail from "../views/ProjectDetail.svelte";
    import ProjectList from "../views/ProjectList.svelte";

    //sidenav
</script>

<div
    class="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]"
>
    <Sidebar />
    <div class="flex flex-col">
        <Header />

        <Router url="admin">
            <Route path="projects">
                <ProjectList />
            </Route>
            <Route path="projects/:id" let:params>
                <ProjectDetail id={params.id} />
            </Route>
            <Route path="files" component={FileList} />
            <Route path="settings" component={SettingsPage} />
            <Route path="query" component={Query} />
        </Router>
    </div>
</div>
