<script lang="ts">
    import { Route, Router } from "svelte-routing";
    import SettingsPage from "../views/settings-page.svelte";
    import Header from "../molecules/header.svelte";
    import Sidebar from "../molecules/sidebar.svelte";
    import FileList from "../views/files-page.svelte";
    import Query from "../views/query-page.svelte";
    import ProjectDetail from "../views/project-detail.svelte";
    import ProjectList from "../views/project-page.svelte";
    import Test from "../views/add-job-form.svelte";

    //sidenav
</script>

<div
    class="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]"
>
    <Sidebar />
    <div class="flex flex-col">
        <Header />

        <Router url="">
            <Route path="projects">
                <ProjectList />
            </Route>
            <Route path="projects/:id" let:params>
                <ProjectDetail id={params.id} />
            </Route>
            <Route path="files" component={FileList} />
            <Route path="settings" component={SettingsPage} />
            <Route path="query" component={Query} />
            <Route path="test" component={Test} />
        </Router>
    </div>
</div>
