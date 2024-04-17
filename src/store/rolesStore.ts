import { writable, type Writable } from 'svelte/store';

interface Role {
    id: number;
    name: string;
    description: string;
}

function createRolesStore() {
    const { subscribe, set }: Writable<Role[]> = writable([]);
    async function fetchRoles(): Promise<void> {
        try {
            const response = await fetch('http://localhost:8000/api/roles/');
            if (!response.ok) {
                throw new Error(`Error: ${response.statusText}`);
            }
            const roles: Role[] = await response.json();
            set(roles);
        } catch (error) {
            console.error("Failed to fetch roles:", error);
            set([]); // Sets the roles to an empty array in case of an error
            throw error;
        }
    }
    return {
        subscribe,
        fetchRoles
    }

}
export const roles = createRolesStore();
