<script lang="ts">
    import * as Card from "$lib/components/ui/card/index.js";
    import { Input } from "$lib/components/ui/input";
    import { Label } from "$lib/components/ui/label";
    import { Textarea } from "$lib/components/ui/textarea";
    import ChevronsUpDown from "lucide-svelte/icons/chevrons-up-down";
    import * as Collapsible from "$lib/components/ui/collapsible/index.js";
    import { Button } from "$lib/components/ui/button/index.js";
    import * as Accordion from "$lib/components/ui/accordion/index.js";
    import { RefreshCcw, Check } from "lucide-svelte";
    import * as Select from "$lib/components/ui/select/index.js";
    import { roles } from "../store/rolesStore";
    import type { Role } from "src/types";
    import { Checkbox } from "$lib/components/ui/checkbox";
    let name: string = "";
    let description: string = "";
    let regenerateTags: boolean = false;
    let allroles: Role[];
    roles.subscribe((roles) => {
        allroles = roles;
    });
    function handleCheckChanged() {
        regenerateTags = !regenerateTags;
    }
</script>

<div class="grid gap-6 p-1">
    <div class="grid gap-3">
        <Label for="name">Name</Label>
        <Input
            id="name"
            type="text"
            class="w-full"
            bind:value={name}
            placeholder="Enter a Short Tag"
        />
    </div>
    <div class="grid gap-3">
        <Label for="description" class="relative"
            >Description
            <Button
                class="ml-2 p-0 absolute  text-blue-600 "
                style="top:-13px;left:80px"
                variant="link"
                ><RefreshCcw class="h-4 w-4 mr-2" /> Generate Description</Button
            >
        </Label>
        <Textarea
            id="description"
            bind:value={description}
            class="min-h-32"
            placeholder="Enter Detailed tag description. A longer description will lead to more accurate auto taging"
        />
        <Select.Root multiple>
            <Select.Trigger>
                <Select.Value placeholder="Select a role" />
            </Select.Trigger>
            <Select.Content>
                {#each allroles as role}
                    <Select.Item value={role.id}>{role.name}</Select.Item>
                {/each}
            </Select.Content>
        </Select.Root>
        <div class="items-top flex space-x-2 my-4">
            <Checkbox
                id="regenTags"
                onCheckedChange={handleCheckChanged}
                checked={regenerateTags}
            />
            <div class="grid gap-1.5 leading-none">
                <Label
                    for="regenTags"
                    class="text-sm mt-0.5 font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                    Apply New Tag
                </Label>
                <p
                    class="{regenerateTags
                        ? ''
                        : 'hidden'} text-sm text-red-600"
                >
                    Checking this will re-evaluate all the tags (including the
                    new one) for all the chunks and apply them automatically.
                </p>
            </div>
        </div>
        <Button><Check class="h-4 w-4 mr-2" /> Save Tag</Button>
    </div>
</div>
