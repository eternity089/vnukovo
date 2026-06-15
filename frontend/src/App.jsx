import { RouterProvider } from "react-router-dom";
import { createAppRouter } from "./router/AppRouter";
import { useAuth } from "./context/AuthContext.jsx";
import Loader from "./components/ui/Loader/Loader.jsx";
import "react-datepicker/dist/react-datepicker.css";
import {API_URL} from "./shared/api.js";
import {useEffect} from "react";

export default function App() {
    if (loading) {return <Loader />;}
    const { user, loading } = useAuth();
    const router = useMemo(
        () => createAppRouter(user, loading),
        [user, loading]
    );
    useEffect(() => {
    fetch(`${API_URL}/api/csrf/`, {
        credentials: "include",
    });
}, []);
    return <RouterProvider router={router} />;
}