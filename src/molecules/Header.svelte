<script>
    import * as Sheet from "$lib/components/ui/sheet";
    import { Button } from "$lib/components/ui/button";
    import Menu from "lucide-svelte/icons/menu";
    import * as DropdownMenu from "$lib/components/ui/dropdown-menu";
    import {
        BotMessageSquare,
        CircleUser,
        Files,
        FolderKanban,
        Package2,
        Search,
        Settings,
    } from "lucide-svelte";
    import { Input } from "$lib/components/ui/input";
    import Searchbox from "./search-box.svelte";
</script>

<header
    class="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6"
>
    <Sheet.Root>
        <Sheet.Trigger asChild let:builder>
            <Button
                variant="outline"
                size="icon"
                class="shrink-0 md:hidden"
                builders={[builder]}
            >
                <Menu class="h-5 w-5" />
                <span class="sr-only">Toggle navigation menu</span>
            </Button>
        </Sheet.Trigger>
        <Sheet.Content side="left" class="flex flex-col">
            <nav class="grid gap-2 text-lg font-medium">
                <a
                    href="##"
                    class="flex items-center gap-2 text-lg font-semibold"
                >
                    <Package2 class="h-6 w-6" />
                    <span class="sr-only">Singular</span>
                </a>
                <a
                    href="##"
                    class="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
                >
                    <FolderKanban class="h-4 w-4" />
                    Projects
                </a>
                <a
                    href="##"
                    class="mx-[-0.65rem] flex items-center gap-4 rounded-xl bg-muted px-3 py-2 text-foreground hover:text-foreground"
                >
                    <Files class="h-4 w-4" />
                    Files
                </a>
                <a
                    href="##"
                    class="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
                >
                    <Settings class="h-4 w-4" />
                    Settings
                </a>
                <a
                    href="##"
                    class="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
                >
                    <BotMessageSquare class="h-4 w-4" />
                    Query
                </a>
            </nav>
        </Sheet.Content>
    </Sheet.Root>
    <div class="w-full flex-1">
        <Searchbox />
    </div>
    <DropdownMenu.Root>
        <DropdownMenu.Trigger asChild let:builder>
            <Button
                builders={[builder]}
                variant="secondary"
                size="icon"
                class="rounded-full"
            >
                <CircleUser class="h-5 w-5" />
                <span class="sr-only">Toggle user menu</span>
            </Button>
        </DropdownMenu.Trigger>
        <DropdownMenu.Content align="end">
            <DropdownMenu.Label>My Account</DropdownMenu.Label>
            <DropdownMenu.Separator />
            <DropdownMenu.Item>Settings</DropdownMenu.Item>
            <DropdownMenu.Item>Support</DropdownMenu.Item>
            <DropdownMenu.Separator />
            <DropdownMenu.Item>Logout</DropdownMenu.Item>
        </DropdownMenu.Content>
    </DropdownMenu.Root>
</header>
