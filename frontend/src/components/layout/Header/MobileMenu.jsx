import { Link, useNavigate } from "react-router-dom";

import Navbar from "../Navbar/Navbar.jsx";
import Button from "../../ui/Button/Button.jsx";

import { useAuth } from "../../../context/AuthContext.jsx";
import { useUI } from "../../../context/UIContext.jsx";

export default function MobileMenu({ onClose }) {

    const { user, logout } = useAuth();
    const { openAuthModal } = useUI();

    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await logout();
            onClose();
            navigate("/");
        } catch (err) {
            console.error("Logout error:", err);
        }
    };
    return (
        <div className="fixed inset-0 z-40 lg:hidden">
            {/* затемнение */}
            <div className="absolute inset-0 bg-black/40" onClick={onClose}/>
            {/* меню */}
            <div className="absolute top-0 right-0 h-full w-full md:w-1/2 bg-white">
                <div className="h-full flex flex-col justify-between p-6">
                    <button onClick={onClose} className="self-end text-3xl text-h">✕</button>
                    <Navbar mobile />
                    {user?.id ? (
                        <div className="flex flex-col gap-4">
                            {user.is_superuser ? (
                                <Button type="button" classname="w-full" onClick={() => {onClose();window.location.href = "/admin/";}}>Панель администратора</Button>
                            ) : (
                                <Link to="/cabinet" onClick={onClose}>
                                    <Button type="button" classname="w-full">Личный кабинет</Button>
                                </Link>
                            )}
                            <Button type="button" classname="w-full" onClick={handleLogout}>Выход</Button>
                        </div>
                    ) : (
                        <div className="flex flex-col gap-4">
                            <Button classname="w-full"
                                onClick={() => {
                                    onClose();
                                    openAuthModal("register");
                                }}>Регистрация</Button>
                            <Button classname="w-full" variant={'primary'}
                                onClick={() => {
                                    onClose();
                                    openAuthModal("login");
                                }}>Авторизация</Button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}