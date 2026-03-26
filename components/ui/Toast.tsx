"use client";

import { useEffect, useState } from "react";
import { X, Music, Users, ThumbsUp, Shuffle, AlertCircle } from "lucide-react";
import { Toast, ToastVariant } from "@/hooks/useToast";

const CONFIG: Record<
    ToastVariant,
    { icon: React.ReactNode; accent: string; glow: string }
> = {
    success: {
        icon: <Music size={18} />,
        accent: "#1DB954",
        glow: "shadow-[0_0_20px_rgba(29,185,84,0.25)]",
    },
    info: {
        icon: <Users size={18} />,
        accent: "#D97706",
        glow: "shadow-[0_0_20px_rgba(217,119,6,0.25)]",
    },
    vote: {
        icon: <ThumbsUp size={18} />,
        accent: "#60a5fa",
        glow: "shadow-[0_0_20px_rgba(96,165,250,0.25)]",
    },
    shuffle: {
        icon: <Shuffle size={18} />,
        accent: "#a78bfa",
        glow: "shadow-[0_0_20px_rgba(167,139,250,0.25)]",
    },
    error: {
        icon: <AlertCircle size={18} />,
        accent: "#f87171",
        glow: "shadow-[0_0_20px_rgba(248,113,113,0.25)]",
    },
};

interface ToastItemProps {
    toast: Toast;
    onRemove: (id: string) => void;
}

const ToastItem = ({ toast, onRemove }: ToastItemProps) => {
    const [visible, setVisible] = useState(false);
    const cfg = CONFIG[toast.variant];

    // Slide-in on mount, slide-out before removal
    useEffect(() => {
        const showTimer = setTimeout(() => setVisible(true), 10);
        const hideTimer = setTimeout(() => setVisible(false), 3800);
        return () => {
            clearTimeout(showTimer);
            clearTimeout(hideTimer);
        };
    }, []);

    return (
        <div
            style={{
                transform: visible ? "translateX(0)" : "translateX(calc(100% + 24px))",
                opacity: visible ? 1 : 0,
                transition: "transform 0.35s cubic-bezier(0.34,1.56,0.64,1), opacity 0.3s ease",
                borderLeft: `3px solid ${cfg.accent}`,
            }}
            className={`relative flex items-start gap-3 bg-[#1C1408]/95 backdrop-blur-xl border border-white/10 rounded-2xl p-4 pr-10 min-w-[280px] max-w-[340px] ${cfg.glow}`}
        >
            {/* Icon */}
            <div
                className="shrink-0 w-8 h-8 rounded-xl flex items-center justify-center mt-0.5"
                style={{ backgroundColor: `${cfg.accent}20`, color: cfg.accent }}
            >
                {cfg.icon}
            </div>

            {/* Text */}
            <div className="flex flex-col gap-0.5 min-w-0">
                <p className="text-[#fef3c7] font-bold text-sm leading-snug">{toast.title}</p>
                {toast.description && (
                    <p className="text-[#A8956A] text-xs leading-snug truncate">{toast.description}</p>
                )}
            </div>

            {/* Close */}
            <button
                onClick={() => onRemove(toast.id)}
                className="absolute top-3 right-3 text-[#A8956A] hover:text-white transition-colors"
            >
                <X size={14} />
            </button>

            {/* Progress bar */}
            <div
                className="absolute bottom-0 left-0 right-0 h-[2px] rounded-full origin-left"
                style={{
                    backgroundColor: cfg.accent,
                    animation: "toast-progress 4.5s linear forwards",
                }}
            />
        </div>
    );
};

interface ToastContainerProps {
    toasts: Toast[];
    onRemove: (id: string) => void;
}

export const ToastContainer = ({ toasts, onRemove }: ToastContainerProps) => {
    return (
        <>
            <style>{`
                @keyframes toast-progress {
                    from { transform: scaleX(1); }
                    to   { transform: scaleX(0); }
                }
            `}</style>
            <div className="fixed bottom-6 right-6 z-9999 flex flex-col gap-3 items-end pointer-events-none">
                {toasts.map(toast => (
                    <div key={toast.id} className="pointer-events-auto">
                        <ToastItem toast={toast} onRemove={onRemove} />
                    </div>
                ))}
            </div>
        </>
    );
};
