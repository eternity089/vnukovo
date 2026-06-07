import { RouterProvider } from "react-router-dom";
import { createAppRouter } from "./router/AppRouter";
import { useAuth } from "./context/AuthContext.jsx";
import Loader from "./components/ui/Loader/Loader.jsx";
import "react-datepicker/dist/react-datepicker.css";

export default function App() {
    const { loading } = useAuth();
    if (loading) {return <Loader />;}
    const router = createAppRouter();
    return <RouterProvider router={router} />;
}