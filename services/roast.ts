import { customFetch } from "./api";
import { RoastResponse } from "@/types/roast";

export const getMyMusicRoast = async (lang: 'ar' | 'en' = 'ar'): Promise<RoastResponse> => {
    return customFetch<RoastResponse>(`/features/roast?lang=${lang}`, {
        method: 'GET',
    });
};