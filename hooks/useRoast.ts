import { useMutation } from '@tanstack/react-query';
import { getMyMusicRoast } from '@/services/roast';
import { RoastResponse } from '@/types/roast';

export const useMusicRoast = () => {
    return useMutation<RoastResponse, Error, void>({
        mutationFn: () => getMyMusicRoast(),
    });
};
