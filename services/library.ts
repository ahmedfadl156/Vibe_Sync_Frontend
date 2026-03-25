import { customFetch } from "./api";
import { LibraryResponse } from "@/types/spotify";

export const getLibrary = async (): Promise<LibraryResponse> => {
    return await customFetch<LibraryResponse>('/auth/library');
};
