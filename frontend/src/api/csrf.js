import {API_URL} from "../shared/api.js";

export const getCSRF = async () => {
    const res = await fetch(`${API_URL}/api/csrf/`, {
        credentials: "include",
    });

    const data = await res.json();
    return data.csrfToken;
};