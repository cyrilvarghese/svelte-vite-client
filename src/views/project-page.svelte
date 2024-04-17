<script lang="ts">
    import { Button } from "$lib/components/ui/button";
    import ProjectCard from "../molecules/project-card.svelte";
    import { onMount } from "svelte";
    import { projects } from "../store/projectStore";
    import { activeRoute } from "../store/projectStore";
    import toast, { Toaster } from "svelte-french-toast";
    import { Link } from "svelte-routing";
    import EmptyState from "../molecules/empty-state.svelte";
 
 
    let error: string = "";
 
 
    onMount(() => {
        let location = window.location;
        activeRoute.set(location.href);
        projects.fetchProjects().catch((err: Error) => {
            error = err.message;
        });
    });
</script>

<main class="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
    <div class="flex items-center">
        <h1 class="text-lg font-semibold md:text-2xl">Projects</h1>
    </div>
    <div class="flex flex-1 items-start justify-start rounded-lg shadow-sm">
        {#if $projects.length === 0 || error}
            <EmptyState
                title="You have no projects"
                description=" Start by creating you first project"
                addButtonText="Add Project"
                showAddAction
            />
        {:else}
            <div>
                <div class="grid grid-cols-3 gap-4">
                    {#each $projects as project (project.id)}
                        <Link to={`/projects/${project.id}`}>
                            <ProjectCard
                                id={project.id}
                                name={project.name}
                                numberOfJobs={project.jobCount}
                                description={project.description}
                            />
                        </Link>
                    {/each}
                </div>
            </div>
        {/if}
    </div>
</main>
