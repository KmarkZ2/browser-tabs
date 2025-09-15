import { useEffect, useState } from "react";

export function useLocalStorage<T>(key: string, initialValue: T) {

    const [value, setValue] = useState<T>(() => {
        if (typeof window === "undefined") return initialValue;
        try {
            const data = localStorage.getItem(key);
            return data ? (JSON.parse(data) as T) : initialValue;
        } catch {
            return initialValue;
        }
    });

    useEffect(() => {
        try {
            localStorage.setItem(key, JSON.stringify(value));
        } catch (e) {
            console.warn(e);
        }
    }, [key, value]);

    return [value, setValue] as const;
};