import { useQuery } from "@tanstack/react-query";
import { getLibrary } from "@/services/library";
import { LibraryResponse } from "@/types/spotify";

export const useLibrary = () => {
    return useQuery<LibraryResponse, Error>({
        queryKey: ["library"],
        queryFn: getLibrary,
        staleTime: 1000 * 60 * 60, 
        refetchOnWindowFocus: false, 
    });
};
