import { writable, type Writable } from 'svelte/store';

export interface QueryRequest {
    question: string;
    results: number;
}
const baseUrl = 'http://localhost:8000/api';
export interface Snippet {
    page_content: string;
    file_source: string;
    url_source: string;
}
export const selectedSnippets = writable<string[]>([]);
export const questionString = writable<string>("");


function createSnippetStore() {
    const { subscribe, set, update }: Writable<[]> = writable([]);

    async function getRelevantSnippets(queryData: QueryRequest): Promise<void> {
        try {
            const response = await fetch(`${baseUrl}/query`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    question: queryData.question,
                    results: queryData.results,
                }),
            });
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            questionString.set(queryData.question)
            set(data);
        } catch (error: any) {
            console.error("Failed to fetch relevant snippets:", error);
            set([]);
            throw error;
        }
    }

    return {
        subscribe,
        getRelevantSnippets,
    };
}

export const snippetStore = createSnippetStore();
