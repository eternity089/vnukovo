import { Outlet } from "react-router-dom";
import Header from "../components/layout/Header/Header.jsx";
import Footer from "../components/layout/Footer/Footer.jsx";

export default function MainLayout() {
    return (
        <>
            <Header />
            <main className="flex flex-col justify-center items-center">
                <Outlet />
            </main>
            <Footer />
        </>
    );
}