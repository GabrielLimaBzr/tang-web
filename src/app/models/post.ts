import { FileHandle } from "./file";

export interface PostResume {
    id: number,
    title: string,
    content: string,
    created: string,
    
}

export interface PostCreate {
    content: string,
    title: string,
    postFiles: FileHandle []
}

export interface Post {
    id: number,
    title: string,
    content: string,
    created: string,
    postFiles: FileHandle []
}