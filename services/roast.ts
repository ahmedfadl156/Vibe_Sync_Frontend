import { customFetch } from "./api";
import { RoastResponse } from "@/types/roast";

export const getMyMusicRoast = async (): Promise<RoastResponse> => {
    return customFetch<RoastResponse>('/features/roast', {
        method: 'GET', 
    });
};