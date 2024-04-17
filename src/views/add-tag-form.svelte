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

    let name: string = "";
    let description: string = "";
    let allroles: Role[];
    roles.subscribe((roles) => {
        allroles = roles;
    });
</script>

<Accordion.Root class="w-full sm:max-w-[100%]">
    <Accordion.Item value="item-1">
        <Accordion.Trigger>Add A Tag</Accordion.Trigger>
        <Accordion.Content>
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
                                <Select.Item value={role.id}
                                    >{role.name}</Select.Item
                                >
                            {/each}
                        </Select.Content>
                    </Select.Root>
                    <Button variant="secondary"
                        ><Check class="h-4 w-4 mr-2" /> Save Tag</Button
                    >
                </div>
            </div>
        </Accordion.Content>
    </Accordion.Item>
</Accordion.Root>
