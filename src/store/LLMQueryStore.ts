import { writable, type Writable } from 'svelte/store';

export interface LLMRequestData {
    topic: string;
    words: number;
    context: string;
}



function createAnswerStore() {
    const { subscribe, set }: Writable<string> = writable("");

    async function fetchAnswer(requestData: LLMRequestData): Promise<void> {
        try {
            const response = await fetch('http://localhost:8000/api/data/qq', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(requestData)
            });

            if (!response.ok) {
                throw new Error(`HTTP Error: ${response.statusText}`);
            }

            const answer: string = await response.json();

            // Update your store with the fetched data
            set(JSON.parse(JSON.parse(answer)).description);
        } catch (error) {
            console.error("Failed to fetch answer:", error);
            throw error;  // Optionally, handle error state in your Svelte component
        }
    }

    return {
        subscribe,
        fetchAnswer,
    };
}

export const answerStore = createAnswerStore();
