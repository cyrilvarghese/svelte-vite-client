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
    import { tags } from "../store/tagStore";
    import LoaderButton from "../molecules/button-with-loader.svelte";

    import { answerStore } from "../store/LLMQueryStore";
    import type { LLMRequestData } from "../store/LLMQueryStore";
    import type { Role } from "src/types";
    import { Checkbox } from "$lib/components/ui/checkbox";
    import type { Selected } from "bits-ui";
    import { createEventDispatcher } from "svelte";
    import { toast } from "svelte-sonner";

    let loading = false;
    const dispatch = createEventDispatcher();
    let name: string = "";
    let description: string = "";
    let regenerateTags: boolean = false;
    let allroles: Role[];
    let selectedRoles: Selected<string>[];
    roles.subscribe((roles) => {
        allroles = roles;
    });

    //params for autogenerate
    let LLMRequest: LLMRequestData = {
        topic: "",
        words: 0,
        context: "",
    };

    function handleCheckChanged() {
        regenerateTags = !regenerateTags;
    }
    async function handleSubmit() {
        debugger;
        loading = true;
        let roles = selectedRoles.map((role) => {
            return +role.value;
        });
        await tags.createTag(name, description, "#000", roles);
        loading = false;
        dispatch("closeModal");
        toast.success("Tag Added Successfully!");
        name="";
        description="";
        selectedRoles=[]; 
    }
    answerStore.subscribe((desc) => {
        description = desc;
    });
    let handleSelectionChange: any = function (
        selectedValues: Selected<string>[],
    ) {
        selectedRoles = selectedValues;
    };
    async function getAutogenResult() {
        debugger;
        loading = true;

        LLMRequest.topic = name;
        LLMRequest.context =
            "create a short description text for the topic provided. The description will be used to match with document embeddings with high cosine similarity";
        LLMRequest.words = 50;

        await answerStore.fetchAnswer(LLMRequest);
        loading = false;
       
    }
</script>

<form
    on:submit|preventDefault={handleSubmit}
    class="grid w=[340px] items-start gap-6"
>
    <fieldset class="grid gap-6 rounded-lg border p-4" disabled={loading}>
        <legend class="-ml-1 px-1 text-sm font-medium"> Job Details </legend>
        <div class="grid gap-6 p-1">
            <div class="grid gap-3">
                <Label for="name">Name</Label>
                <Input
                    id="name"
                    type="text"
                    class="w-full"
                    bind:value={name}
                    placeholder="Enter A Short Tag"
                />
            </div>
            <div class="grid gap-6">
                <div class="grid gap-3">
                    <Label for="description" class="relative"
                        >Description
                        <Button
                            on:click={getAutogenResult}
                            class="ml-2 p-0 absolute  text-blue-600 "
                            style="top:-13px;left:80px"
                            variant="link"
                            ><RefreshCcw class="h-4 w-4 mr-2" />

                            Generate Description</Button
                        >
                    </Label>
                    <Textarea
                        id="description"
                        bind:value={description}
                        class="min-h-32"
                        placeholder="Enter Detailed tag description. A longer description will lead to more accurate auto taging"
                    />
                </div>
                <div class="grid gap-3">
                    <Label for="description" class="relative">Roles</Label>
                    <Select.Root
                        multiple
                        selected={selectedRoles}
                        onSelectedChange={handleSelectionChange}
                    >
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
                </div>
                <div class="items-top flex space-x-2">
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
                            Checking this will re-evaluate all the tags
                            (including the new one) for all the chunks and apply
                            them automatically. This might take some time.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </fieldset>
    <LoaderButton buttonText="Save" isLoading={loading} />
</form>
