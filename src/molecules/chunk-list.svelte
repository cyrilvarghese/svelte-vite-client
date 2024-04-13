<script lang="ts">
	import { cn } from "$lib/utils.js";
	import { Badge } from "$lib/components/ui/badge";
	import { ScrollArea } from "$lib/components/ui/scroll-area";
	import { mails } from "./data.js";

	export let chunks: any[];

	function get_badge_variant_from_label(label: string) {
		if (["work"].includes(label.toLowerCase())) {
			return "default";
		}

		if (["personal"].includes(label.toLowerCase())) {
			return "outline";
		}

		return "secondary";
	}
</script>

<main>
	<ScrollArea class="h-[calc(100vh-300px)] pb-4">
		<div class="flex flex-col gap-6 p-4 pl-0 pt-4">
			{@debug chunks}
			{#each [1,2,3,4,5] as chunks}
				<button
					class={cn(
						"flex flex-col bg-white items-start gap-2 rounded-lg shadow-sm  p-4 text-left text-sm transition-all hover:bg-accent hover:shadow",
					)}
				>
					<div
						class="line-clamp-2 text-sm m-4 ml-0 text-muted-foreground"
					>
						Hi, let's have a meeting tomorrow to discuss the
						project. I've been reviewing the project details and
						have some ideas I'd like to share. It's crucial that we
						align on our next steps to ensure the project's
						success.\n\nPlease come prepared with any questions or
						insights you may have. Looking forward to our
						meeting!\n\nBest regards, William",
					</div>

					<div class="flex items-center gap-2">
						{#each ["meeting", "work", "important"] as label}
							<Badge
								variant={get_badge_variant_from_label(label)}
							>
								{label}
							</Badge>
						{/each}
					</div>
				</button>
			{/each}
		</div>
	</ScrollArea>
</main>
