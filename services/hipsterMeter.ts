import { hipsterMeterResponse } from "@/types/hipsterMeter"
import { customFetch } from "./api"

export const getMyHipsterMeter = async () => {
    return customFetch<hipsterMeterResponse>("/features/hipster-meter", {
        method: "GET",
    })
}