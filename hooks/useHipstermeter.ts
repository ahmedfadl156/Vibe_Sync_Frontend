import { useQuery } from "@tanstack/react-query"
import { getMyHipsterMeter } from "@/services/hipsterMeter"
import { hipsterMeterResponse } from "@/types/hipsterMeter"

export const useHipsterMeter = () => {
    return useQuery<hipsterMeterResponse, Error>({
        queryKey: ["hipster-meter"],
        queryFn: getMyHipsterMeter,
        staleTime: 1000 * 60 * 60,
        refetchOnWindowFocus: false,
    })
}