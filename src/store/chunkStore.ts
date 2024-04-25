import { writable, type Writable } from 'svelte/store';
const BASE_URL = "http://localhost:8000/api"
import { toast } from 'svelte-sonner';

export interface MetadataUpdateRequest {
    docs: any[],
    doc_ids: string[],
     
}

function createMetadataStore() {
    const { subscribe, set }: Writable<[]> = writable([]);

    async function updateMetadataTags(requestBody: MetadataUpdateRequest): Promise<void> {
        try {
            const response = await fetch(`${BASE_URL}/chunks/update_metadata`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    docs: Array.isArray(requestBody.docs) ? requestBody.docs : [requestBody.docs],
                    doc_ids: Array.isArray(requestBody.doc_ids) ? requestBody.doc_ids : [requestBody.doc_ids],
                }),
            });

            if (!response.ok) {
                throw new Error(`Error: ${response.statusText}`);

            }

            const result = await response.json();
            toast.success("Tags Updated Successfully!");
            // Assuming you might want to manage state, adjust as necessary
        } catch (error) {
            toast.error("Failed to update metadata:" + error)
            set([]); // Clear or handle errors as needed
            throw error;
        }
    }

    return {
        subscribe,
        updateMetadataTags,
    };
}

export const metadataStore = createMetadataStore();
