<script lang="ts">
    import {
        ChevronDown,
        Circle,
        Edit,
        Plus,
        Star,
        View,
        ListChecks,
        Tag,
        Tags,
        ListCollapse,
        Trash2,
    } from "lucide-svelte";
    import { Button } from "$lib/components/ui/button";
    import * as Card from "$lib/components/ui/card";
    import * as DropdownMenu from "$lib/components/ui/dropdown-menu";
    import { Separator } from "$lib/components/ui/separator";
    import { Router, links, Link } from "svelte-routing";
    import { onMount } from "svelte";

    // Props
    export let id: number;
    export let name: string;
    export let description: string;
    export let numberOfJobs: number | undefined; // Assuming this is what you meant by "no of tags"
   

    // Action Methods
    export let onEdit: () => void;
    export let onDelete: () => void;
   

   
</script>

<Card.Root>
    <Card.Header class="grid   gap-4 space-y-0">
        <div class="flex flex-row justify-between">
            <div class="space-y-1">
                <Card.Title class="hover:underline cursor-pointer"
                    >{name}</Card.Title
                >
                <Card.Description>
                    {description}
                </Card.Description>
            </div>
            <div
                class="flex space-x-1 rounded-md text-secondary-foreground"
                use:links
            >
                <Router>
                    <DropdownMenu.Root>
                        <DropdownMenu.Trigger asChild let:builder>
                            <Button
                                size="icon"
                                builders={[builder]}
                                variant="ghost"
                            >
                                <ChevronDown
                                    class="h-4 w-4 text-secondary-foreground"
                                />
                            </Button>
                        </DropdownMenu.Trigger>

                        <DropdownMenu.Content class="w-[200px]" align="end">
                            <Link to="/projects/{id}" let:active>
                                <DropdownMenu.Item>
                                    <ListCollapse class="mr-2 h-4 w-4" /> View Project
                                </DropdownMenu.Item>
                            </Link>
                            <DropdownMenu.Item on:click={onEdit}>
                                <Edit class="mr-2 h-4 w-4" /> Update
                            </DropdownMenu.Item>
                            <DropdownMenu.Item on:click={onDelete}>
                                <Trash2 class="mr-2 h-4 w-4" /> Delete
                            </DropdownMenu.Item>
                        </DropdownMenu.Content>
                    </DropdownMenu.Root>
                </Router>
            </div>
        </div>
    </Card.Header>
    <Card.Content>
        <div class="flex space-x-4 text-sm text-muted-foreground">
            <div class="flex items-center">
                <Circle class="mr-1 h-3 w-3 fill-sky-400 text-sky-400" />
                Document Tagging
            </div>
            <div class="flex items-center">
                <Star class="mr-1 h-3 w-3" />
                {numberOfJobs} Jobs
            </div>
            <div>Updated April 2023</div>
        </div>
 
        
    </Card.Content>
</Card.Root>
