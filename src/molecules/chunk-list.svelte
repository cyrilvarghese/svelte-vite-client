<script lang="ts">
	import { cn } from "$lib/utils.js";
	import { ScrollArea } from "$lib/components/ui/scroll-area";
	import type { Tag } from "src/types/index.js";
	import BadgeList from "./badge-list.svelte";
	import { onMount } from "svelte";
	export let chunks: any[] = [];
	/**
	 * Determines the variant of the component, which affects its styling and potentially its behavior.
	 * - "simple" for a basic variant without additional features.
	 * - "w-checkbox" for a variant that includes a checkbox.
	 *
	 * @prop {"all" | "review" | "approved"} variant - The variant type.
	 */
	export let variant: "all" | "review" | "approved";

	function get_badge_variant_from_label(label: string) {
		if (["work"].includes(label.toLowerCase())) {
			return "default";
		}

		if (["personal"].includes(label.toLowerCase())) {
			return "outline";
		}

		return "secondary";
	}
	function getDataPerVariant(data: any[]) {
		debugger
		if (variant === "approved") {
			return data.filter((chunk) => {
				return !chunk.review; //return item that dont need review
			});
		} else if (variant === "review") {
			return data.filter((chunk) => {
				return chunk.review; //return items that  need review
			});
		}
		return data;
	}
</script>

<main>
	<ScrollArea class="h-[calc(100vh-300px)] pb-4">
		<div class="flex flex-col gap-6 p-4 pl-0 pt-4">
			{#if chunks}
				{#each chunks as chunk}
					{#each getDataPerVariant(chunk.data) as docObj}
						<button
							class={cn(
								"flex flex-col bg-white items-start gap-2 rounded-lg shadow-sm  p-4 text-left text-sm transition-all hover:bg-accent hover:shadow",
							)}
						>
							<div
								class="line-clamp-2 text-sm m-4 ml-0 text-muted-foreground"
							>
								{docObj.document}
							</div>

							<div class="flex items-center gap-2">
								<BadgeList tags={docObj.tags} />
							</div>
						</button>
					{/each}
				{/each}
			{/if}
		</div>
	</ScrollArea>
</main>
