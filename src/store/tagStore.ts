import { writable, type Writable } from 'svelte/store';
import { toast } from 'svelte-sonner';
import type { Tag } from 'src/types';

const BASE_URL = "http://localhost:8000/api"

export let tagsList: Writable<Tag[]> = writable([]);
function createTagsStore() {
    const { subscribe, update }: Writable<Tag[]> = writable([]);

    async function createTag(name: string, description: string, color: string, role_ids: number[], project_id: number): Promise<void> {

        const tag = {
            name: name,
            description: description,
            color: color,
            role_ids: role_ids,
            project_id: project_id
        };



        try {
            const response = await fetch(`${BASE_URL}/tags/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',  // Ensure the content type is set to application/json
                },
                body: JSON.stringify(tag)
            });
            if (!response.ok) {
                throw new Error(`Error: ${response.statusText}`);
            }
            const createdTag: Tag = await response.json();

            // Update the store with the new tag
            update(tagsList => [...tagsList, createdTag]);
           
        } catch (error) {
            console.error("Failed to create a tag:", error);
            throw error;
        }
    }
    async function fetchTagsByProject(projectId: number): Promise<Tag[]> {
        try {
            const response = await fetch(`${BASE_URL}/projects/${projectId}/tags`);
            if (!response.ok) {
                throw new Error(`Error: ${response.statusText}`);
            }
            const tags: Tag[] = await response.json();
            tagsList.set(tags);
            return tags;
        } catch (error) {
            console.error("Failed to fetch tags:", error);
            throw error;
        }
    }
    return {
        subscribe,
        fetchTagsByProject,
        createTag,
    };
}

export const tags = createTagsStore();
