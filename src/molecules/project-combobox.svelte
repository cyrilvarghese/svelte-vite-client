<script lang="ts">
  import Check from "lucide-svelte/icons/check";
  import ChevronsUpDown from "lucide-svelte/icons/chevrons-up-down";
  import { tick } from "svelte";
  import * as Command from "$lib/components/ui/command/index.js";
  import * as Popover from "$lib/components/ui/popover/index.js";
  import { Button } from "$lib/components/ui/button/index.js";
  import { cn } from "$lib/utils.js";
  import type { Project } from "src/types";
  import { onMount } from "svelte";
  import { projects } from "../store/projectStore";
  import { Label } from "$lib/components/ui/label";
  import { createEventDispatcher } from "svelte";

  const frameworks = [
    {
      value: "sveltekit",
      label: "SvelteKit",
    },
    {
      value: "next.js",
      label: "Next.js",
    },
    {
      value: "nuxt.js",
      label: "Nuxt.js",
    },
    {
      value: "remix",
      label: "Remix",
    },
    {
      value: "astro",
      label: "Astro",
    },
  ];

  onMount(() => {
    projects.fetchProjects();
  });
  const dispatch = createEventDispatcher();

  let projectsList: Project[];
  projects.subscribe((projects) => {
    projectsList = projects;
  });
  let open = false;
  let value = "";
  $: projectsMap = projectsList.map((proj) => {
    return { value: proj.id.toString(), label: proj.name };
  });

  $: selectedValue =
    projectsMap.find((f) => f.value === value)?.label ?? "Search by project name...";

  // We want to refocus the trigger button when the user selects
  // an item from the list so users can continue navigating the
  // rest of the form with the keyboard.
  function closeAndFocusTrigger(triggerId: string) {
    open = false;
    tick().then(() => {
      document.getElementById(triggerId)?.focus();
    });
  }
</script>

<div class="flex flex-col gap-3">
  <Label for="files">Select Project</Label>
  <Popover.Root bind:open let:ids>
    <Popover.Trigger asChild let:builder>
      <Button
        builders={[builder]}
        variant="outline"
        role="combobox"
        aria-expanded={open}
        class="w-full justify-between"
      >
        {selectedValue}
        <ChevronsUpDown class="ml-2 h-4 w-4 shrink-0 opacity-50" />
      </Button>
    </Popover.Trigger>
    <Popover.Content side="bottom-start" class="w-[300px] p-0">
      <Command.Root>
        <Command.Input placeholder="Search project..." />
        <Command.Empty>No project found.</Command.Empty>
        <Command.Group>
          {#each projectsMap as project}
            <Command.Item
              value={project.value}
              onSelect={(currentValue) => {
                value = currentValue;
                dispatch("projectSelected", { projectId: value });
                closeAndFocusTrigger(ids.trigger);
              }}
            >
              <Check
                class={cn(
                  "mr-2 h-4 w-4",
                  value !== project.value && "text-transparent",
                )}
              />
              {project.label}
            </Command.Item>
          {/each}
        </Command.Group>
      </Command.Root>
    </Popover.Content>
  </Popover.Root>
</div>
