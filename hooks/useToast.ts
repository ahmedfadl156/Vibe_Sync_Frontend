import { useState, useCallback } from "react";

export type ToastVariant = "info" | "success" | "vote" | "shuffle" | "error";

export interface Toast {
    id: string;
    variant: ToastVariant;
    title: string;
    description?: string;
}

export const useToast = () => {
    const [toasts, setToasts] = useState<Toast[]>([]);

    const removeToast = useCallback((id: string) => {
        setToasts(prev => prev.filter(t => t.id !== id));
    }, []);

    const addToast = useCallback((toast: Omit<Toast, "id">) => {
        const id = Math.random().toString(36).slice(2);
        setToasts(prev => [...prev, { ...toast, id }]);
        setTimeout(() => removeToast(id), 4500);
        return id;
    }, [removeToast]);

    return { toasts, addToast, removeToast };
};
