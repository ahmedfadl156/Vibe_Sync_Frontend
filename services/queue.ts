import { customFetch } from "./api";
import { AddTrackRequest, AddTrackResponse, GetQueueResponse } from "@/types/queue";

export const getRoomQueue = async (roomId: string): Promise<GetQueueResponse> => {
    return await customFetch<GetQueueResponse>(`/queue/${roomId}`);
};

export const addTrackToQueue = async (roomId: string, data: AddTrackRequest): Promise<AddTrackResponse> => {
    return await customFetch<AddTrackResponse>(`/queue/${roomId}/add`, {
        method: 'POST',
        body: JSON.stringify(data),
    });
};

export const voteQueueTrack = async (queueItemId: string): Promise<any> => {
    return await customFetch(`/queue/vote/${queueItemId}`, {
        method: 'PATCH',
    });
};
