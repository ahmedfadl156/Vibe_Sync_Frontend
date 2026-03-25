const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:5500/api/v1";

// هنعمل هنا custom Fetch علشان منكررش الكود كتير
export const customFetch = async <T>(endpoint: string , options: RequestInit = {}): Promise<T> => {
    const url = `${API_URL}${endpoint}`;

    const config: RequestInit = {
        ...options,
        headers: {
            'Content-Type': 'application/json',
            ...options.headers,
        },
        credentials: 'include',
    };

    try {
        const response = await fetch(url , config);

        if(!response.ok){
            const errorData = await response.json().catch(() => ({}));
            throw new Error(errorData.message || `Http error! status: ${response.status}`)
        };

        if(response.status === 204) return {} as T;
        
        return await response.json();
    } catch (error) {
        console.error(`API Fetch Error [${endpoint}]:` , error);
        throw error;
    }
}