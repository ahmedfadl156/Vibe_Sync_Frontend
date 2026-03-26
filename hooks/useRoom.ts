import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createRoom } from "@/services/room";
import { CreateRoomRequest, CreateRoomResponse } from "@/types/room";

export const useCreateRoom = () => {
    const queryClient = useQueryClient();

    return useMutation<CreateRoomResponse, Error, CreateRoomRequest>({
        mutationFn: createRoom,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["myRoom"] });
        },
    });
};
