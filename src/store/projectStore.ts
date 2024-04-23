import type { Project, File, JobDetail, Tag } from 'src/types';
import { toast } from 'svelte-sonner';
import { writable, type Writable } from 'svelte/store';
const BASE_URL = "http://localhost:8000/api"


export const selectedFileNames = writable<string[]>([]);
export const activeRoute = writable("/");
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
            toast.error("Unable to get projects");
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


    async function fetchProjectFiles(projectId: number): Promise<File[]> {
        try {
            const response = await fetch(`${BASE_URL}/projects/${projectId}/files`);
            if (!response.ok) {
                throw new Error(`Error: ${response.statusText}`);
            }
            const files: File[] = await response.json();
            // You might want to do something with the files, like setting them to a store or returning them.
            return files; // This is just a placeholder action.
        } catch (error) {
            toast.error("Unable to get files");
            console.error("Failed to fetch project files:", error);
            throw error;
        }
    }


    async function createJobWithFiles(projectId: number, name: string, description: string, files: FileList): Promise<void> {
        const formData = new FormData();
        formData.append('project_id', projectId.toString());
        formData.append('name', name);
        formData.append('description', description);
        for (let i = 0; i < files.length; i++) {
            formData.append('files', files[i]);
        }

        try {
            const response = await fetch(`${BASE_URL}/jobs/`, {
                method: 'POST',
                body: formData
            });
            if (!response.ok) {
                throw new Error(`Error: ${response.statusText}`);
            }
            const result = await response.json();
            // console.log("Job and files created successfully:", result);
        } catch (error) {
            console.error("Failed to create job and files:", error);
            throw error;
        }
    }

    async function fetchChunksByFilenames(fileNames: string[]): Promise<any[]> {
        try {
            const response = await fetch(`${BASE_URL}/chunks/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ fileNames })
            });
            if (!response.ok) {
                throw new Error(`Error: ${response.statusText}`);
            }
            const result: any[] = await response.json();
            return result;
        } catch (error) {
            console.error("Failed to process files:", error);
            throw error;
        }
    }



    return {
        subscribe,
        fetchProjects,
        fetchJobDetails,
        fetchProjectById,
        fetchProjectFiles,
        createJobWithFiles,

        fetchChunksByFilenames,
        selectedFileNames,


    };
}

export const projects = createProjectsStore();
