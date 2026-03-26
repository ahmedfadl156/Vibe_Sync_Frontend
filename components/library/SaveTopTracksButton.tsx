"use client";

import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { saveTopTracks } from "@/services/users";
import { toast } from "sonner";
import { Loader2, ListMusic } from "lucide-react";

export const SaveTopTracksButton = () => {
    const { mutate: savePlaylist, isPending, isSuccess, data } = useMutation({
        mutationFn: saveTopTracks,
        onSuccess: (response) => {
            const { playlistName, playlistUrl } = response.data;
            toast.success("Playlist created successfully!", {
                description: `Saved as "${playlistName}"`,
                action: {
                    label: "Listen on Spotify",
                    onClick: () => window.open(playlistUrl, "_blank"),
                },
            });
        },
        onError: (error: any) => {
            toast.error(error?.message || "Failed to create playlist");
        },
    });

    return (
        <div className="mt-8 flex justify-center">
            {isSuccess && data?.data?.playlistUrl ? (
                <button
                    onClick={() => window.open(data.data.playlistUrl, "_blank")}
                    className="group relative inline-flex h-12 items-center justify-center overflow-hidden rounded-full bg-[#1DB954] px-8 font-medium text-white shadow-xl transition-all hover:scale-105 active:scale-95"
                >
                    <ListMusic className="mr-2 h-5 w-5 transition-transform group-hover:scale-110" />
                    <span>Listen on Spotify</span>
                    <div className="absolute inset-0 -z-10 bg-white/20 opacity-0 transition-opacity group-hover:opacity-100" />
                </button>
            ) : (
                <button
                    onClick={() => savePlaylist()}
                    disabled={isPending}
                    className="group relative inline-flex h-12 items-center justify-center overflow-hidden rounded-full bg-linear-to-r from-[#D97706] to-[#A8956A] px-8 font-medium text-white shadow-xl transition-all hover:scale-105 active:scale-95 disabled:pointer-events-none disabled:opacity-50"
                >
                    {isPending ? (
                        <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    ) : (
                        <ListMusic className="mr-2 h-5 w-5 transition-transform group-hover:scale-110" />
                    )}
                    <span>Save to Spotify Playlist</span>
                    <div className="absolute inset-0 -z-10 bg-white/20 opacity-0 transition-opacity group-hover:opacity-100" />
                </button>
            )}
        </div>
    );
};
