import type { Project } from 'src/types';
import { writable, type Writable } from 'svelte/store';
const BASE_URL = "http://localhost:8000/api"


function createProjectsStore() {
    const { subscribe, set }: Writable<Project[]> = writable([]);

    async function fetchProjects(): Promise<void> {
        try {
            const response = await fetch(`${BASE_URL}/projects/`);
            if (!response.ok) {
                throw new Error(`Error: ${response.statusText}`);
            }
            let projects: Project[] = await response.json();

            // Calculate jobCount for each project
            projects = projects.map(project => ({
                ...project,
                jobCount: project.jobs.length, // Add the jobCount based on the jobs array length
            }));

            set(projects);
        } catch (error) {
            console.error("Failed to fetch projects:", error);
            set([]);
            throw error;
        }
    }

    // New method to fetch details of a specific job within a project
    async function fetchJobDetails(projectId: number, jobId: number): Promise<JobDetail> {
        try {
            const response = await fetch(`${BASE_URL}/projects/${projectId}/jobs/${jobId}`);
            if (!response.ok) {
                throw new Error(`Error: ${response.statusText}`);
            }
            const jobDetail: JobDetail = await response.json();
            return jobDetail;
        } catch (error) {
            console.error("Failed to fetch job details:", error);
            throw error;
        }
    }

    // New method to fetch a specific project by ID
    async function fetchProjectById(projectId: number): Promise<Project> {
        try {
            const response = await fetch(`${BASE_URL}/projects/${projectId}`);
            if (!response.ok) {
                throw new Error(`Error: ${response.statusText}`);
            }
            const project: Project = await response.json();
            return project;
        } catch (error) {
            console.error("Failed to fetch project by ID:", error);
            throw error;
        }
    }

    return {
        subscribe,
        fetchProjects,
        fetchJobDetails, // Include the new method in the returned object
        fetchProjectById, // Including fetchProjectById method
    };
}

export const projects = createProjectsStore();
