<script lang="ts">
    import { Button, buttonVariants } from "$lib/components/ui/button/index.js";
    import * as Dialog from "$lib/components/ui/dialog/index.js";
    import { Input } from "$lib/components/ui/input";
    import { Label } from "$lib/components/ui/label";
    import Rabbit from "lucide-svelte/icons/rabbit";
    import Bird from "lucide-svelte/icons/bird";
    import Turtle from "lucide-svelte/icons/turtle";
    import { Textarea } from "$lib/components/ui/textarea";
    import * as Select from "$lib/components/ui/select/index.js";
    import { Plus } from "lucide-svelte";
    import type { Selected } from "bits-ui";
    import { Badge } from "$lib/components/ui/badge/index.js";
    let tags: Selected<unknown>[] = [
        { value: "t1", label: "genesis" },

        { value: "t3", label: "quantum" },
    ];
</script>

<form class="grid w-full items-start gap-6">
    <fieldset class="grid gap-6 rounded-lg border p-4">
        <legend class="-ml-1 px-1 text-sm font-medium"> Settings </legend>
        <div class="grid gap-3">
            <Label for="temperature">Job Name</Label>
            <Input id="temperature" type="text" placeholder="Enter Job Name" />
        </div>
        <!-- <!-- <div class="grid gap-3"> -->
        <!-- <div class="grid gap-3">
            <Label for="model">Tags</Label>
            <Select.Root multiple selected={tags}>
                <Select.Trigger
                    id="model"
                    class="items-start [&_[data-description]]:hidden"
                >
                    <Select.Value  placeholder="Select a model" />
                </Select.Trigger>
                <Select.Content>
                    <Select.Item value="t1">genesis</Select.Item>
                    <Select.Item value="t2">explorer</Select.Item>
                    <Select.Item value="t3">quantum</Select.Item>
                </Select.Content>
            </Select.Root>
        </div> -->
        <div class="grid gap-3">
            <Label for="temperature">Temperature</Label>
            <Input id="temperature" type="number" placeholder="0.4" />
        </div>
        <div class="grid grid-cols-2 gap-4">
            <div class="grid gap-3">
                <Label for="top-p">Top P</Label>
                <Input id="top-p" type="number" placeholder="0.7" />
            </div>
            <div class="grid gap-3">
                <Label for="top-k">Top K</Label>
                <Input id="top-k" type="number" placeholder="0.0" />
            </div>
        </div>
    </fieldset>
    <fieldset class="grid gap-6 rounded-lg border p-4">
        <legend class="-ml-1 px-1 text-sm font-medium"> Messages </legend>
        <div class="grid gap-3">
            <Label for="role">Role</Label>
            <Select.Root selected={{ value: "system", label: "system" }}>
                <Select.Trigger>
                    <Select.Value placeholder="Select a role" />
                </Select.Trigger>
                <Select.Content>
                    <Select.Item value="system">System</Select.Item>
                    <Select.Item value="user">User</Select.Item>
                    <Select.Item value="assistant">Assistant</Select.Item>
                </Select.Content>
            </Select.Root>
        </div>
        <div class="grid gap-3">
            <Label for="content">Content</Label>
            <Textarea
                id="content"
                placeholder="You are a..."
                class="min-h-[9.5rem]"
            />
        </div>
    </fieldset>
</form>
