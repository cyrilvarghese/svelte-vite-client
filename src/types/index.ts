export interface Tag {
    score: string;
    id?: number;
    name: string;
    description: string;
    color: string;
    role_ids: number[];
}

export interface File {
    id: number;
    name: string;
    created_at: string;
}

export interface Role {
    id: number;
    name: string;
    description: string;
}
export interface JobDetail {
    id: number;
    name: string;
    project_id: number;
    createdAt: string;
    tags: Tag[];
    files: File[];
}

export interface Job {
    id: number;
    name: string;
    created_at: string;
}

export interface Project {
    id: number;
    name: string;
    description: string;
    jobs: Job[];
    jobCount?: number; // Optional property to store the count
}