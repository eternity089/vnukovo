import { createContext, useContext, useEffect, useState } from "react";
import { getCookie } from "../utils/cookies.js";
const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const startTime = Date.now();
        fetch("/api/me/", {
            credentials: "include"
        })
            .then(res => res.json())
            .then(data => {
                if (data.id) {setUser(data);}
            })
            .finally(() => {
                const elapsed = Date.now() - startTime;
                const minDelay = 2000;
                const remaining = Math.max(minDelay - elapsed, 0);
                setTimeout(() => {
                    setLoading(false);
                }, remaining);
            });
    }, []);
    const logout = async () => {
        const csrftoken = getCookie("csrftoken");
        await fetch("/api/logout/", {
            method: "POST",
            credentials: "include",
            headers: {
                "X-CSRFToken": csrftoken
            }
        });
        setUser(null);
    };
    return (
        <AuthContext.Provider value={{ user, setUser, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
}
export function useAuth() {
    return useContext(AuthContext);
}