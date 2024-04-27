<script lang="ts">
    import Button from "$lib/components/ui/button/button.svelte";
    import { Router, links, Link } from "svelte-routing";
    import { onMount } from "svelte";
    import { activeRoute } from "../store/projectStore";

    import {
        Bell,
        BotMessageSquare,
        Files,
        FolderKanban,
        Home,
        MousePointerClick,
        Settings,
    } from "lucide-svelte";
    let location: string;
    activeRoute.subscribe((href) => {
        location = href;
    });
</script>

<div class="hidden border-r bg-muted/40 md:block">
    <div class="flex h-full max-h-screen flex-col gap-2">
        <div class="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
            <a href="/" class="flex items-center gap-2 font-semibold">
                <MousePointerClick class="h-6 w-6" />
                <span class="">Singular</span>
            </a>
            <Button variant="outline" size="icon" class="ml-auto h-8 w-8">
                <Bell class="h-4 w-4" />
                <span class="sr-only">Toggle notifications</span>
            </Button>
        </div>
        <div class="flex-1">
            <nav
                use:links
                class="grid items-start px-2 text-sm font-medium lg:px-4"
            >
                <Router>
                    <Link to="/" let:active>
                        <span
                            class="flex items-center
                                gap-3 rounded-lg px-3 py-2
                                transition-all hover:text-primary {active
                                ? 'text-primary bg-muted'
                                : 'text-muted-foreground'}"
                        >
                            <Home class="h-4 w-4" />
                            Home
                        </span>
                    </Link>
                    <Link to="/projects/" let:active>
                        <span
                            class="flex items-center
                                gap-3 rounded-lg px-3 py-2
                                text-muted-foreground transition-all hover:text-primary {location.indexOf(
                                '/projects',
                            ) !== -1
                                ? 'text-primary bg-muted'
                                : 'text-muted-foreground '}"
                        >
                            <FolderKanban class="h-4 w-4" />
                            Projects
                        </span>
                    </Link>
                    <Link to="/files" let:active>
                        <span
                            class="flex items-center
                                gap-3 rounded-lg px-3 py-2
                                transition-all hover:text-primary {active
                                ? 'text-primary bg-muted'
                                : 'text-muted-foreground'}"
                        >
                            <Files class="h-4 w-4" />
                            Files
                        </span>
                    </Link>
                    <Link to="/settings" let:active>
                        <span
                            class="flex items-center
                                gap-3 rounded-lg px-3 py-2
                                transition-all hover:text-primary {active
                                ? 'text-primary bg-muted'
                                : 'text-muted-foreground'}"
                        >
                            <Settings class="h-4 w-4" />
                            Settings
                        </span>
                    </Link>
                    <Link to="/query" let:active>
                        <span
                            class="flex items-center
                            gap-3 rounded-lg px-3 py-2
                            transition-all hover:text-primary {active
                                ? 'text-primary bg-muted'
                                : 'text-muted-foreground'}"
                        >
                            <BotMessageSquare class="h-4 w-4" />
                            Playground
                        </span>
                    </Link>
                </Router>
            </nav>
        </div>
    </div>
</div>
