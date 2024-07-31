import { cookies } from "next/headers";

export const API_URL = "http://localhost:8080/";

class API {
    static async request(
        url: string,
        method: "GET" | "POST" | "PUT" | "DELETE",
        auth: boolean = true,
        params: RequestInit = {}
    ): Promise<Response> {
        const headers: HeadersInit = {
            ...params.headers,
            "Content-Type": "application/json"
        };

        if (auth) {
            const token = cookies().get("token");
            // @ts-ignore
            if (token) headers.Authorization = `Bearer ${token}`;
        }

        return fetch(API_URL + url, {
            ...params,
            method,
            headers
        });
    }

    static get(url: string, auth: boolean = true, params: RequestInit = {}): Promise<Response> {
        return this.request(url, "GET", auth, params);
    }

    static post(url: string, body: any, auth: boolean = true, params: RequestInit = {}): Promise<Response> {
        return this.request(url, "POST", auth, { ...params, body: JSON.stringify(body) });
    }

    static put(url: string, body: any, auth: boolean = true, params: RequestInit = {}): Promise<Response> {
        return this.request(url, "PUT", auth, { ...params, body: JSON.stringify(body) });
    }

    static delete(url: string, auth: boolean = true, params: RequestInit = {}): Promise<Response> {
        return this.request(url, "DELETE", auth, params);
    }
}

export default API;
