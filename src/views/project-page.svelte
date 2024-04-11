<script lang="ts">
    import { Button } from "$lib/components/ui/button";
    import ProjectCard from "../molecules/project-card.svelte";
    import { onMount } from "svelte";
    import { projects } from "../store/projectStore";
    import { Link } from "svelte-routing";
    let error: string = "";

    onMount(() => {
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
            <div class="flex flex-col items-center gap-1 text-center">
                <h3 class="text-2xl font-bold tracking-tight">
                    You have no Projects
                </h3>
                <p class="text-sm text-muted-foreground">
                    Start by creating you first project
                </p>
                <Button class="mt-4">Add Project</Button>
            </div>
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
