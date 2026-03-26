"use client";

import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { CreateRoomForm } from "@/components/create-room/CreateRoomForm";

const CreateRoomPage = () => {
    const { isAuthenticated, isLoading } = useAuth();
    const router = useRouter();

    // Redirect to home if unauthenticated
    useEffect(() => {
        if (!isLoading && !isAuthenticated) {
            router.push('/');
        }
    }, [isLoading, isAuthenticated, router]);

    if (isLoading) {
        return (
            <div className="min-h-screen pt-24 pb-20 px-4 flex justify-center items-center">
                <div className="w-12 h-12 border-4 border-[#D97706]/30 border-t-[#D97706] rounded-full animate-spin"></div>
            </div>
        );
    }

    if (!isAuthenticated) return null;

    return (
        <main className="min-h-screen pt-24 pb-20 px-4 md:px-8 bg-[url('/bg-pattern.svg')] bg-cover bg-center">
            {/* Dark overlay for better text readability */}
            <div className="absolute inset-0 bg-[#0D0906]/90 mix-blend-multiply z-0 pointer-events-none"></div>
            
            <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center">
                <div className="w-full flex justify-center animate-in fade-in slide-in-from-bottom-8 duration-700 ease-out mt-8 md:mt-16">
                    <CreateRoomForm />
                </div>
            </div>
        </main>
    );
};

export default CreateRoomPage;