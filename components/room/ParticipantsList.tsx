import { PopulatedUser } from "@/types/room";
import { Crown, User } from "lucide-react";

interface ParticipantsListProps {
    participants: PopulatedUser[];
    hostId: string;
}

export const ParticipantsList = ({ participants, hostId }: ParticipantsListProps) => {
    return (
        <div className="bg-[#1C1408]/60 backdrop-blur-xl border border-[#D97706]/20 p-6 rounded-3xl h-full flex flex-col">
            <h2 className="text-xl font-bold text-[#fef3c7] mb-6 flex items-center gap-2">
                <User className="text-[#D97706]" size={20} />
                Vibers ({participants.length})
            </h2>

            <div className="flex flex-col gap-4 overflow-y-auto pr-2 custom-scrollbar">
                {participants.map((user) => (
                    <div key={user._id} className="flex items-center gap-3 p-2 rounded-xl hover:bg-white/5 transition-colors">
                        <div className="relative">
                            <div className="w-10 h-10 rounded-full bg-[#2A1E08] border border-white/10 overflow-hidden flex items-center justify-center">
                                {user.avatar ? (
                                    <img src={user.avatar} alt={user.displayName} className="w-full h-full object-cover" />
                                ) : (
                                    <span className="text-sm font-bold text-[#A8956A]">
                                        {user.displayName.charAt(0).toUpperCase()}
                                    </span>
                                )}
                            </div>
                            {user._id === hostId && (
                                <div className="absolute -top-1 -right-1 bg-[#D97706] rounded-full p-0.5 shadow-md text-[#1C1408]">
                                    <Crown size={12} strokeWidth={3} />
                                </div>
                            )}
                        </div>
                        <div className="flex flex-col">
                            <span className="text-[#fef3c7] text-sm font-medium">{user.displayName}</span>
                            {user._id === hostId && (
                                <span className="text-[10px] text-[#A8956A] uppercase tracking-wider font-bold">Host</span>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
