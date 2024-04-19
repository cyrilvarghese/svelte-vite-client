import { writable, type Writable } from 'svelte/store';

interface Tag {
    id?: number;
    name: string;
    description: string;
    color?: string;
    role_ids: number[];
}

function createTagsStore() {
    const { subscribe, update }: Writable<Tag[]> = writable([]);

    async function createTag(name: string, description: string, color: string, role_ids: number[]): Promise<void> {

        const tag = {
            name: name,
            description: description,
            color: color,
            role_ids: role_ids
        };



        try {
            const response = await fetch('http://localhost:8000/api/tags/', {
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
            update(tags => [...tags, createdTag]);
        } catch (error) {
            console.error("Failed to create a tag:", error);
            throw error;
        }
    }

    return {
        subscribe,
        createTag,
    };
}

export const tags = createTagsStore();
