import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { joinRoom } from "@/services/room";
import { getRoomQueue, addTrackToQueue, voteQueueTrack } from "@/services/queue";
import { AddTrackRequest } from "@/types/queue";

export const useRoomData = (roomCode: string) => {
    const queryClient = useQueryClient();

    const roomQuery = useQuery({
        queryKey: ["room", roomCode],
        queryFn: () => joinRoom(roomCode),
        retry: false,
    });

    const roomId = roomQuery.data?.data?.room?._id;

    const queueQuery = useQuery({
        queryKey: ["queue", roomId],
        queryFn: () => getRoomQueue(roomId!),
        enabled: !!roomId,
    });

    const addTrackMutation = useMutation({
        mutationFn: (trackData: AddTrackRequest) => addTrackToQueue(roomId!, trackData),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["queue", roomId] });
        }
    });

    const voteMutation = useMutation({
        mutationFn: (queueItemId: string) => voteQueueTrack(queueItemId),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["queue", roomId] });
        }
    });

    return {
        roomData: roomQuery.data?.data?.room,
        roomId,
        isRoomLoading: roomQuery.isLoading,
        roomError: roomQuery.error,

        queueData: queueQuery.data?.data?.queue,
        isQueueLoading: queueQuery.isLoading,
        queueError: queueQuery.error,

        addTrack: addTrackMutation.mutate,
        isAddingTrack: addTrackMutation.isPending,
        addTrackError: addTrackMutation.error,

        voteTrack: voteMutation.mutate,
        isVoting: voteMutation.isPending
    };
};
